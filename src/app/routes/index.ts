import { Router } from "express";
import { PassengerRouter } from "../modules/passenger/passenger.route";
import { BusOwnerRouter } from "../modules/busOwner/busOwner.route";
import { PermissionRouter } from "../modules/permission/permission.route";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { AdminRouter } from "../modules/admin/admin.route";
import { BusRouter } from "../modules/bus/bus.route";
import { TripRouter } from "../modules/trip/trip.route";

const router = Router();

const moduleRoutes = [
  { path: "/passenger", route: PassengerRouter },
  { path: "/bus-owner", route: BusOwnerRouter },
  { path: "/admin", route: AdminRouter },
  { path: "/permission", route: PermissionRouter },
  { path: "/user", route: UserRouter },
  { path: "/auth", route: AuthRouter },
  { path: "/bus", route: BusRouter },
  { path: "/trip", route: TripRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
