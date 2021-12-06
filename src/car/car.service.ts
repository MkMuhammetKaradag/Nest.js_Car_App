import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';
import { Car, CarDocument } from './schemas/car.schema';

const carProjection = {
  __v: false,
  _id: false,
};

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<CarDocument>,
  ) {}
  public async getCars(): Promise<Car[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Foundddd', 404);
    }
    return cars;
  }
  public async postCar(nawCar: CarDto) {
    const car = new this.carModel(nawCar);
    return car.save();
  }
  public async getCarById(id: number): Promise<Car> {
    const car = await this.carModel.findOne({ id }, carProjection);
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
  public async deleteCarById(id: number): Promise<any> {
    const car = await this.carModel.deleteOne({ id });
    if (car!.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async putCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<Car> {
    const car = await this.carModel.findOneAndUpdate(
      { id },
      { [propertyName]: propertyValue },
    );
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
