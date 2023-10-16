import { Types } from "mongoose";
import { HydratedDocument, Model } from "mongoose";
import { IPassenger } from "../passenger/passenger.interface";
import { ITrip } from "../trip/trip.interface";

export type IBooked = {
  seat: string;
  passenger: Types.ObjectId | IPassenger;
  trip: Types.ObjectId | ITrip;
  status: "pending" | "accepted" | "cancelled";
};

export type IBookedMethods = {
  fullName(): string;
};

export type BookedModel = {
  createWithFullName(): Promise<HydratedDocument<IBooked, IBookedMethods>>;
  // name: string,
} & Model<IBooked, object, IBookedMethods>;
