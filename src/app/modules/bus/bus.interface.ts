import { Types } from "mongoose";
import { HydratedDocument, Model } from "mongoose";
import { IBusOwner } from "../busOwner/busOwner.interface";

export type IBus = {
  name: string;
  owner: Types.ObjectId | IBusOwner;
};

export type IBusMethods = {
  fullName(): string;
};

export type BusModel = {
  createWithFullName(): Promise<HydratedDocument<IBus, IBusMethods>>;
  // name: string,
} & Model<IBus, object, IBusMethods>;
