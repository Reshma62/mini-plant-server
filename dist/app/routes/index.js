"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../modules/products/product.route");
const images_route_1 = require("../modules/images/images.route");
const category_route_1 = require("../modules/category/category.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/api/category",
        route: category_route_1.categoryRoutes,
    },
    {
        path: "/api/product",
        route: product_route_1.productRoutes,
    },
    {
        path: "/api/images",
        route: images_route_1.imageRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
