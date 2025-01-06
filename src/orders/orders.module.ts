import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { envsVars } from 'src/config';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS',
        transport: Transport.TCP,
        options: {
          port: envsVars.ORDERS_SERVICE_PORT,
          host: envsVars.ORDERS_SERVICE_HOST,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
