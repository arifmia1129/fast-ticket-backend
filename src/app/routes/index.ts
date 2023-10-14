import { Router } from "express";
import { PassengerRouter } from "../modules/passenger/passenger.route";
import { BusOwnerRouter } from "../modules/busOwner/busOwner.route";
import { PermissionRouter } from "../modules/permission/permission.route";
import { UserRouter } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  { path: "/passenger", route: PassengerRouter },
  { path: "/bus-owner", route: BusOwnerRouter },
  { path: "/permission", route: PermissionRouter },
  { path: "/user", route: UserRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
