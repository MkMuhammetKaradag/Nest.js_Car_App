import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';

@Controller('car')
export class CarController {
  constructor(private CarService: CarService) {}

  @Get()
  async getCars() {
    return this.CarService.getCars();
  }

  @Post()
  public async postCar(@Body() car: CarDto) {
    return this.CarService.postCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return await this.CarService.getCarById(id);
  }
  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return this.CarService.deleteCarById(id);
  }
  @Put(':id')
  public async putCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return await this.CarService.putCarById(id, propertyName, propertyValue);
  }
}
