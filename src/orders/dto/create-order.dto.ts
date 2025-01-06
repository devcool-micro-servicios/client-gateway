import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enums/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  readonly totalAmount: number;
  @IsNumber()
  @IsPositive()
  readonly totalItems: number;
  @IsEnum(OrderStatusList, {
    message: `Order status must be one of: ${OrderStatusList}`,
  })
  @IsOptional()
  readonly status: OrderStatus = OrderStatus.PENDING;
  @IsOptional()
  @IsBoolean()
  readonly paid: boolean = false;
}
