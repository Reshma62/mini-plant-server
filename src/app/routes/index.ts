import { Router } from "express";
import { productRoutes } from "../modules/products/product.route";
import { imageRoutes } from "../modules/images/images.route";
import { categoryRoutes } from "../modules/category/category.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/api/category",
    route: categoryRoutes,
  },
  {
    path: "/api/product",
    route: productRoutes,
  },
  {
    path: "/api/images",
    route: imageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
