import { ObjectId } from "mongoose";

export interface IProduct {
  category: ObjectId;
  title: string;
  price: number;
  quantity: number;
  description: string;
  rating: number;
  image: string;
}
