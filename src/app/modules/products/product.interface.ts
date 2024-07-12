import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  category: ObjectId;
  title: string;
  price: number;
  quantity: number;
  description: string;
  rating: number;
  image: string;
}
