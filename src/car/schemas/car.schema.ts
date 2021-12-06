// import * as mongoose from 'mongoose';

// export const CarSchema = new mongoose.Schema({});
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema()
export class Car {
  // @Prop()
  // name: string;

  // @Prop()
  // age: number;

  // @Prop()
  // breed: string;

  @Prop()
  id: Number;
  @Prop()
  brand: String;
  @Prop()
  color: String;
  @Prop()
  model: String;
}

export const CarSchema = SchemaFactory.createForClass(Car);
