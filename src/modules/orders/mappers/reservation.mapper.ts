import { Reservation } from '../entities/reservation.entity.js';
import { ReservationOrmEntity } from '../entities/reservation.orm-entity.js';

export class ReservationMapper {
  static toOrm(domain: Reservation): ReservationOrmEntity {
    const orm = new ReservationOrmEntity();
    orm.reservationId = domain.reservationId;
    orm.parkingSpotId = domain.parkingSpotId;
    orm.userId = domain.userId;
    orm.startsAt = domain.startsAt;
    orm.endsAt = domain.endsAt;
    orm.status = domain.getStatus();
    orm.createdAt = domain.createdAt;
    return orm;
  }

  static toDomain(orm: ReservationOrmEntity): Reservation {
    return new Reservation(
      orm.reservationId,
      orm.parkingSpotId,
      orm.userId,
      orm.startsAt,
      orm.endsAt,
      orm.status,
      orm.createdAt,
    );
  }
}
