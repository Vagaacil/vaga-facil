import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { typeOrmConfig } from './config/typeorm.config.js';
import { OccupancyModule } from './modules/occupancy/occupancy.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter.js';
import { PaymentsModule } from './modules/payments/payments.module.js';

const databaseImports =
  process.env.DB_ENABLED === 'true'
    ? [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
            ({
              ...typeOrmConfig(),
              host: configService.get<string>('POSTGRES_HOST') ?? 'localhost',
              port: Number(configService.get<number>('POSTGRES_PORT') ?? 5432),
              username:
                configService.get<string>('POSTGRES_USER') ?? 'postgres',
              password:
                configService.get<string>('POSTGRES_PASSWORD') ?? 'postgres',
              database:
                configService.get<string>('POSTGRES_DB') ?? 'vaga_facil',
            }) as TypeOrmModuleOptions,
        }),
      ]
    : [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' })];

@Module({
  imports: [...databaseImports, OrdersModule, PaymentsModule, OccupancyModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: DatabaseExceptionFilter },
  ],
})
export class AppModule {}
