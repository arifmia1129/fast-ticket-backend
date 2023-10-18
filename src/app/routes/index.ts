import { Router } from "express";
import { PassengerRouter } from "../modules/passenger/passenger.route";
import { BusOwnerRouter } from "../modules/busOwner/busOwner.route";
import { PermissionRouter } from "../modules/permission/permission.route";
import { UserRouter } from "../modules/user/user.route";
import { AuthRouter } from "../modules/auth/auth.route";
import { AdminRouter } from "../modules/admin/admin.route";
import { BusRouter } from "../modules/bus/bus.route";
import { TripRouter } from "../modules/trip/trip.route";
import { BookedRouter } from "../modules/booked/booked.route";
import { ContactRouter } from "../modules/contact/contact.route";
import { NewsRouter } from "../modules/news/news.route";
import { BlogRouter } from "../modules/blog/blog.route";

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
  { path: "/booked", route: BookedRouter },
  { path: "/contact", route: ContactRouter },
  { path: "/news", route: NewsRouter },
  { path: "/blog", route: BlogRouter },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
