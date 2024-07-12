// services/productService.ts

import { getPaginateDataService } from "../../utils/getPaginateData";
import { IQuery } from "../category/category.interface";
import { IProduct } from "./product.interface";
import ProductModel from "./product.model";

export const createProductService = async (payload: IProduct) => {
  const existingProduct = await ProductModel.findOne({ title: payload.title });
  if (existingProduct) {
    throw new Error("Product with this title already exists");
  }

  const result = await ProductModel.create(payload);
  return result;
};

export const updateProductService = async (
  productId: string,
  payload: Partial<IProduct>
) => {
  const existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  // Check if updating to a new title that already exists
  if (payload.title) {
    const duplicateProduct = await ProductModel.findOne({
      title: payload.title,
      _id: { $ne: productId },
    });
    if (duplicateProduct) {
      throw new Error("Product with this title already exists");
    }
  }

  // Perform the update
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    payload,
    { new: true }
  );

  return updatedProduct;
};

export const deleteProductService = async (productId: string) => {
  const existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  return deletedProduct;
};

export const getAllProductsService = async (query: IQuery) => {
  const searchFields = ["name", "description"];
  console.log(query, "query");
  const { data, count } = await getPaginateDataService<IProduct>(
    ProductModel,
    query,
    searchFields
  );

  return { data, count };
};

export const getProductByIdService = async (productId: string) => {
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};
