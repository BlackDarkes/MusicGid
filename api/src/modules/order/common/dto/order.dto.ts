import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { OrderItemDto } from "src/modules/order-item/common/orderItem.dto";
import { Type } from "class-transformer";

class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  paymentMethod: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[]
}

class UpdateOrderStatusDto {
  @IsNumber()
  statusId: number;
}

class UpdateOrderAddressDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}

export { CreateOrderDto, UpdateOrderStatusDto, UpdateOrderAddressDto };