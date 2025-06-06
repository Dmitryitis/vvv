import { IsNumber, IsOptional, Min, Max } from 'class-validator'

export class CalculateApartmentDto {
  @IsNumber()
  @Min(1)
  totalArea: number

  @IsNumber()
  @Min(1)
  livingArea: number

  @IsNumber()
  @Min(1)
  floor: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  kitchenArea?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  totalFloors?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  passengerElevators?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  cargoElevators?: number

  @IsOptional()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearBuilt?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  balcony?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  garbageChute?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  parking?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  rooms?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  buildingType?: number

  @IsOptional()
  @IsNumber()
  @Min(2)
  ceilingHeight?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  separateBathrooms?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4)
  renovation?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(3)
  windowView?: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  metroDistance?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(2)
  objectType?: number
}
