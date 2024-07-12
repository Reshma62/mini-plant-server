import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

export const createProductService = async (payload: IProduct) => {
  // Check if product already exists by title
  const existingProduct = await ProductModel.findOne({ title: payload.title });
  if (existingProduct) {
    throw new Error("Product with this title already exists");
  }

  const result = await ProductModel.create(payload);
  return result;
}; 















