import { Router } from "express";
import { PassengerRouter } from "../modules/passenger/passenger.route";

const router = Router();

const moduleRoutes = [{ path: "/passenger", route: PassengerRouter }];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
