import { Schema, model } from "mongoose";
import { ITrip, ITripMethods, TripModel } from "./trip.interface";

export const TripSchema = new Schema<ITrip, TripModel, ITripMethods>(
  {
    bus: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Bus",
    },
    busNo: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seats: [
      {
        seat: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ["available", "booked"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Trip = model<ITrip, TripModel>("Trip", TripSchema);

export default Trip;
