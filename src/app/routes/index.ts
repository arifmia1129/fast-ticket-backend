import { Router } from "express";
import { PassengerRouter } from "../modules/passenger/passenger.route";
import { BusOwnerRouter } from "../modules/busOwner/busOwner.route";
import { PermissionRouter } from "../modules/permission/permission.route";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { AdminRouter } from "../modules/admin/admin.route";

const router = Router();

const moduleRoutes = [
  { path: "/passenger", route: PassengerRouter },
  { path: "/bus-owner", route: BusOwnerRouter },
  { path: "/admin", route: AdminRouter },
  { path: "/permission", route: PermissionRouter },
  { path: "/user", route: UserRouter },
  { path: "/auth", route: AuthRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
