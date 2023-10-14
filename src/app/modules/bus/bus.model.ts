import { Schema, model } from "mongoose";
import { IBus, IBusMethods, BusModel } from "./bus.interface";

export const BusSchema = new Schema<IBus, BusModel, IBusMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "BusOwner",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Bus = model<IBus, BusModel>("Bus", BusSchema);

export default Bus;
