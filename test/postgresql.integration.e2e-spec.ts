import { randomUUID } from 'node:crypto';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DataSource } from 'typeorm';
import { Patio } from '../src/modules/occupancy/entities/patio.entity.js';
import { Vaga } from '../src/modules/occupancy/entities/vaga.entity.js';
import { CategoriaDeVaga } from '../src/modules/occupancy/entities/categoria-de-vaga.entity.js';
import { TarifaVigente } from '../src/modules/occupancy/entities/tarifa-vigente.entity.js';
import { RegistroDePermanencia } from '../src/modules/occupancy/entities/registro-de-permanencia.entity.js';
import {
  ImpedimentoSaida,
  DecisaoImpedimentoSaida,
} from '../src/modules/occupancy/entities/impedimento-saida.entity.js';
import { ParkingStayRecord } from '../src/modules/occupancy/entities/parking-stay.persistence.entity.js';
import { Reservation } from '../src/modules/orders/entities/reservation.entity.js';
import { Motorista } from '../src/modules/orders/entities/motorista.entity.js';
import { Veiculo } from '../src/modules/orders/entities/veiculo.entity.js';
import { Reserva } from '../src/modules/orders/entities/reserva.entity.js';
import { TransacaoDePagamento } from '../src/modules/payments/entities/transacao-de-pagamento.entity.js';
import { TypeOrmParkingOperationsRepository } from '../src/modules/occupancy/repositories/typeorm-parking-operations.repository.js';
import { ReservationStatusEnum } from '../src/common/enums/reservation-status.enum.js';

describe('PostgreSQL integration UC01-UC10', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    const resetDataSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_TEST_HOST ?? 'localhost',
      port: Number(process.env.POSTGRES_TEST_PORT ?? 5434),
      username: process.env.POSTGRES_TEST_USER ?? 'postgres',
      password: process.env.POSTGRES_TEST_PASSWORD ?? 'postgres',
      database: process.env.POSTGRES_TEST_DB ?? 'vaga_facil_test',
      entities: [],
      synchronize: false,
    });
    await resetDataSource.initialize();
    await resetDataSource.query('DROP SCHEMA public CASCADE');
    await resetDataSource.query('CREATE SCHEMA public');
    await resetDataSource.destroy();

    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_TEST_HOST ?? 'localhost',
      port: Number(process.env.POSTGRES_TEST_PORT ?? 5434),
      username: process.env.POSTGRES_TEST_USER ?? 'postgres',
      password: process.env.POSTGRES_TEST_PASSWORD ?? 'postgres',
      database: process.env.POSTGRES_TEST_DB ?? 'vaga_facil_test',
      entities: [
        Patio,
        Vaga,
        CategoriaDeVaga,
        TarifaVigente,
        RegistroDePermanencia,
        ImpedimentoSaida,
        ParkingStayRecord,
        Reservation,
        Motorista,
        Veiculo,
        Reserva,
        TransacaoDePagamento,
      ],
      synchronize: true,
      dropSchema: false,
    });
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('persists and reconnects every use-case aggregate', async () => {
    const parking = new TypeOrmParkingOperationsRepository(dataSource);
    const patio = await parking.createPatio(
      new Patio(randomUUID(), 'Pátio Integração'),
    );
    const spot = await parking.createVaga(
      new Vaga(randomUUID(), patio.patioId, 'INT-01', 'PADRAO'),
    );
    await parking.criarCategoria(
      new CategoriaDeVaga(randomUUID(), patio.patioId, 'MOTO', 'Motocicletas', [
        'MOTO',
      ]),
    );
    await parking.salvarTarifa(
      new TarifaVigente(randomUUID(), patio.patioId, 18, 60, 0, new Date()),
    );

    const driverRepository = dataSource.getRepository(Motorista);
    const vehicleRepository = dataSource.getRepository(Veiculo);
    const reservationRepository = dataSource.getRepository(Reserva);

    const driver = await driverRepository.save(
      new Motorista(randomUUID(), 'Ana Integração', 'integracao@example.com'),
    );
    const vehicle = await vehicleRepository.save(
      new Veiculo(randomUUID(), driver.motoristaId, 'INT1234', 'CARRO'),
    );

    const reservationId = randomUUID();
    const expiresAt = new Date(Date.now() + 15 * 60_000);
    const retained = await parking.reterVaga(
      patio.patioId,
      'PADRAO',
      reservationId,
      vehicle.placa,
      expiresAt,
      new Date(),
    );
    const reservation = await reservationRepository.save(
      new Reserva(
        reservationId,
        patio.patioId,
        retained.vagaId,
        driver.motoristaId,
        vehicle.veiculoId,
        vehicle.placa,
        'PADRAO',
        expiresAt,
        ReservationStatusEnum.CONFIRMED,
        new Date(),
      ),
    );

    const entry = await parking.registrarEntrada(
      patio.patioId,
      vehicle.placa,
      new Date(),
      randomUUID(),
    );
    expect(entry.reservaId).toBe(reservation.reservaId);

    const impediment = await parking.resolverImpedimentoSaida(
      new ImpedimentoSaida(
        randomUUID(),
        entry.registro.registroId,
        DecisaoImpedimentoSaida.MANTER_RETIDO,
        'Persistência comprovada',
        'operador-integracao',
        new Date(),
      ),
    );
    expect(impediment.impedimento.justificativa).toBe(
      'Persistência comprovada',
    );

    const tariff = await parking.buscarTarifaVigente(patio.patioId, new Date());
    expect(tariff?.valorPorHora).toBe(18);

    const closed = await parking.finalizarSaida(
      entry.registro.registroId,
      new Date(entry.registro.horarioEntrada.getTime() + 60_000),
    );
    expect(closed.registro.getStatus()).toBe('closed');

    const indicators = await parking.obterIndicadores(patio.patioId);
    expect(indicators.totalVagas).toBe(1);

    await dataSource.destroy();
    dataSource = new DataSource({
      type: 'postgres',
      host: process.env.POSTGRES_TEST_HOST ?? 'localhost',
      port: Number(process.env.POSTGRES_TEST_PORT ?? 5434),
      username: process.env.POSTGRES_TEST_USER ?? 'postgres',
      password: process.env.POSTGRES_TEST_PASSWORD ?? 'postgres',
      database: process.env.POSTGRES_TEST_DB ?? 'vaga_facil_test',
      entities: [
        Patio,
        Vaga,
        CategoriaDeVaga,
        TarifaVigente,
        RegistroDePermanencia,
        ImpedimentoSaida,
        ParkingStayRecord,
        Reservation,
        Motorista,
        Veiculo,
        Reserva,
        TransacaoDePagamento,
      ],
      synchronize: false,
    });
    await dataSource.initialize();
    await expect(
      dataSource.getRepository(Patio).findOneBy({ patioId: patio.patioId }),
    ).resolves.toMatchObject({
      patioId: patio.patioId,
    });
    await expect(
      dataSource.getRepository(Vaga).findOneBy({ vagaId: spot.vagaId }),
    ).resolves.toBeTruthy();
    await expect(
      dataSource
        .getRepository(Motorista)
        .findOneBy({ motoristaId: driver.motoristaId }),
    ).resolves.toBeTruthy();
    await expect(
      dataSource
        .getRepository(Veiculo)
        .findOneBy({ veiculoId: vehicle.veiculoId }),
    ).resolves.toBeTruthy();
  });

  it('allows only one concurrent reservation and only one concurrent entry', async () => {
    const parking = new TypeOrmParkingOperationsRepository(dataSource);
    const reservationPatio = await parking.createPatio(
      new Patio(randomUUID(), 'Pátio Reserva Concorrente'),
    );
    await parking.createVaga(
      new Vaga(randomUUID(), reservationPatio.patioId, 'RES-01', 'PADRAO'),
    );

    const firstReservation = randomUUID();
    const secondReservation = randomUUID();
    const expiry = new Date(Date.now() + 15 * 60_000);
    const reservationResults = await Promise.allSettled([
      parking.reterVaga(
        reservationPatio.patioId,
        'PADRAO',
        firstReservation,
        'CON1111',
        expiry,
        new Date(),
      ),
      parking.reterVaga(
        reservationPatio.patioId,
        'PADRAO',
        secondReservation,
        'CON2222',
        expiry,
        new Date(),
      ),
    ]);
    expect(
      reservationResults.filter((result) => result.status === 'fulfilled'),
    ).toHaveLength(1);
    expect(
      reservationResults.filter((result) => result.status === 'rejected'),
    ).toHaveLength(1);

    const entryPatio = await parking.createPatio(
      new Patio(randomUUID(), 'Pátio Entrada Concorrente'),
    );
    await parking.createVaga(
      new Vaga(randomUUID(), entryPatio.patioId, 'ENT-01', 'PADRAO'),
    );

    const entryPlate = 'CON3333';
    const entryResults = await Promise.allSettled([
      parking.registrarEntrada(
        entryPatio.patioId,
        entryPlate,
        new Date(),
        randomUUID(),
      ),
      parking.registrarEntrada(
        entryPatio.patioId,
        entryPlate,
        new Date(),
        randomUUID(),
      ),
    ]);
    expect(
      entryResults.filter((result) => result.status === 'fulfilled'),
    ).toHaveLength(1);
    expect(
      entryResults.filter((result) => result.status === 'rejected'),
    ).toHaveLength(1);
  });
});
