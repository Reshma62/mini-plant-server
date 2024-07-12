import { Document } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  categoryImage: string;
}

export interface IQuery {
  page?: string;
  limit?: string;
  sort?: string;
  search?: string;
}
