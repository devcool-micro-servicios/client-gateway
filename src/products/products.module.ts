import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envsVars, PRODUCTS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          port: envsVars.PRODUCTS_SERVICE_PORT,
          host: envsVars.PRODUCTS_SERVICE_HOST,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
