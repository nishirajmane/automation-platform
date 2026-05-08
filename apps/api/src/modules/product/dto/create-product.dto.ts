import { IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';

export enum PricingModelDto {
  FREE = 'FREE',
  ONE_TIME = 'ONE_TIME',
  SUBSCRIPTION = 'SUBSCRIPTION',
  USAGE_BASED = 'USAGE_BASED',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsEnum(PricingModelDto)
  pricingModel!: PricingModelDto;
}
