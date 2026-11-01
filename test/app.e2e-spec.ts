import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Server } from 'node:http';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<Server>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/orders/reservation-1/confirm (POST)', () => {
    return request(app.getHttpServer())
      .post('/orders/reservation-1/confirm')
      .expect(201)
      .expect(({ body }) => {
        expect(body).toMatchObject({
          reservationId: 'reservation-1',
          reservationStatus: 'confirmed',
        });
      });
  });

  it('/parking-stays/stay-1/checkout (POST)', () => {
    return request(app.getHttpServer())
      .post('/parking-stays/stay-1/checkout')
      .expect(201)
      .expect(({ body }) => {
        const responseBody = body as {
          parkingStayId: string;
          vehiclePlate: string;
          parkingSpotId: string;
          status: string;
          totalAmount: number;
        };

        expect(responseBody).toMatchObject({
          parkingStayId: 'stay-1',
          vehiclePlate: 'ABC-1234',
          parkingSpotId: 'spot-1',
          status: 'closed',
        });
        expect(responseBody.totalAmount).toBeGreaterThan(0);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
