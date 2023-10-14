import { Types } from "mongoose";
import { HydratedDocument, Model } from "mongoose";
import { IBus } from "../bus/bus.interface";

export type ISeat = {
  seat: string;
  status: "available" | "booked";
};

export type ITrip = {
  bus: Types.ObjectId | IBus;
  busNo: string;
  source: string;
  destination: string;
  date: Date;
  seats: ISeat[];
};

export type ITripMethods = {
  fullName(): string;
};

export type TripModel = {
  createWithFullName(): Promise<HydratedDocument<ITrip, ITripMethods>>;
  // name: string,
} & Model<ITrip, object, ITripMethods>;
