import { ParkingStay } from '../entities/parking-stay.entity.js';
import { ParkingStayOrmEntity } from '../entities/parking-stay.orm-entity.js';

export class ParkingStayMapper {
  static toOrm(domain: ParkingStay): ParkingStayOrmEntity {
    const orm = new ParkingStayOrmEntity();
    orm.parkingStayId = domain.parkingStayId;
    orm.vehiclePlate = domain.vehiclePlate;
    orm.parkingSpotId = domain.parkingSpotId;
    orm.startedAt = domain.startedAt;
    orm.hourlyRate = domain.hourlyRate;
    orm.status = domain.getStatus();
    orm.endedAt = domain.getEndedAt() ?? null;
    orm.totalAmount = domain.getTotalAmount() ?? null;
    orm.createdAt = domain.createdAt;
    return orm;
  }

  static toDomain(orm: ParkingStayOrmEntity): ParkingStay {
    const domain = new ParkingStay(
      orm.parkingStayId,
      orm.vehiclePlate,
      orm.parkingSpotId,
      orm.startedAt,
      orm.hourlyRate,
      orm.status,
      orm.createdAt,
    );

    domain['status'] = orm.status;
    domain['endedAtValue'] = orm.endedAt ?? undefined;
    domain['totalAmountValue'] = orm.totalAmount ?? undefined;
    return domain;
  }
}
