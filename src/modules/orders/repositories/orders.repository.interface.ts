import { Order } from "../entities/order.entity";

export const ORDERS_REPOSITORY = 'ORDERS_REPOSITORY';

export interface IOrdersRepository {
    findById(orderId: string): Promise<Order | null>;
}