import { Controller, Post, Body } from '@nestjs/common'
import { ApartmentService } from './apartment.service'
import { CalculateApartmentDto } from './apartment.dto'

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post('calculate')
  async calculatePrice(@Body() apartmentData: CalculateApartmentDto) {
    return this.apartmentService.calculatePrice(apartmentData)
  }
}
