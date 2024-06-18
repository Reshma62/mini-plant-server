import { Router } from "express";
import { UsersRoutes } from "../modules/user/users.route";
// import { StudentsRoutes } from "../modules/students/students.route";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/api/users",
    route: UsersRoutes,
  },
  {
    path: "/api/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
