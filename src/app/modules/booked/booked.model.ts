import { Schema, model } from "mongoose";
import { IBooked, IBookedMethods, BookedModel } from "./booked.interface";

export const BookedSchema = new Schema<IBooked, BookedModel, IBookedMethods>(
  {
    seat: {
      type: String,
      required: true,
    },
    passenger: {
      type: Schema.Types.ObjectId,
      ref: "Passenger",
      required: true,
    },
    trip: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Booked = model<IBooked, BookedModel>("Booked", BookedSchema);

export default Booked;
