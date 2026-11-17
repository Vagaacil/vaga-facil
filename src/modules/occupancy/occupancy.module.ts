import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingStayController } from './controllers/parking-stay.controller.js';
import { PermanenciasController } from './controllers/permanencias.controller.js';
import { ImpedimentosSaidaController } from './controllers/impedimentos-saida.controller.js';
import { CategoriasVagaController } from './controllers/categorias-vaga.controller.js';
import { IndicadoresController } from './controllers/indicadores.controller.js';
import { PatiosController } from './controllers/patios.controller.js';
import { TarifasController } from './controllers/tarifas.controller.js';
import { CLOCK_PORT, SystemClock } from './domain/clock.port.js';
import { PARKING_OPERATIONS_REPOSITORY } from './domain/parking-operations.repository.interface.js';
import { Patio } from './entities/patio.entity.js';
import { ImpedimentoSaida } from './entities/impedimento-saida.entity.js';
import { CategoriaDeVaga } from './entities/categoria-de-vaga.entity.js';
import { RegistroDePermanencia } from './entities/registro-de-permanencia.entity.js';
import { TarifaVigente } from './entities/tarifa-vigente.entity.js';
import { Vaga } from './entities/vaga.entity.js';
import { InMemoryParkingOperationsRepository } from './repositories/in-memory-parking-operations.repository.js';
import { TypeOrmParkingOperationsRepository } from './repositories/typeorm-parking-operations.repository.js';
import { PARKING_STAY_REPOSITORY } from './repositories/parking-stay.repository.interface.js';
import { InMemoryParkingStayRepository } from './repositories/in-memory-parking-stay.repository.js';
import { ParkingOperationsService } from './services/parking-operations.service.js';
import { ParkingStayService } from './services/parking-stay.service.js';
import { RegistrarEntradaHandler } from './services/registrar-entrada.handler.js';
import { PaymentsModule } from '../payments/payments.module.js';

const typeOrmEnabled = process.env.DB_ENABLED === 'true';

@Module({
  imports: typeOrmEnabled
    ? [
        PaymentsModule,
        TypeOrmModule.forFeature([
          Patio,
          ImpedimentoSaida,
          CategoriaDeVaga,
          Vaga,
          TarifaVigente,
          RegistroDePermanencia,
        ]),
      ]
    : [PaymentsModule],
  controllers: [
    ParkingStayController,
    PatiosController,
    TarifasController,
    PermanenciasController,
    ImpedimentosSaidaController,
    CategoriasVagaController,
    IndicadoresController,
  ],
  providers: [
    ParkingStayService,
    ParkingOperationsService,
    RegistrarEntradaHandler,
    { provide: CLOCK_PORT, useClass: SystemClock },
    {
      provide: PARKING_STAY_REPOSITORY,
      useClass: InMemoryParkingStayRepository,
    },
    {
      provide: PARKING_OPERATIONS_REPOSITORY,
      useClass: typeOrmEnabled
        ? TypeOrmParkingOperationsRepository
        : InMemoryParkingOperationsRepository,
    },
  ],
  exports: [ParkingStayService, ParkingOperationsService, CLOCK_PORT],
})
export class OccupancyModule {}
