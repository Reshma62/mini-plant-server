import { IProduct } from "./product.interface";
// models/Product.ts
import { Schema, model } from "mongoose";

const productSchema = new Schema<IProduct>({
  category: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  image: { type: String, required: true },
});

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
