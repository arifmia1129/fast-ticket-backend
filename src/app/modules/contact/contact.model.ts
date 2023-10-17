import { Schema, model } from "mongoose";
import { IContact, IContactMethods, ContactModel } from "./contact.interface";

export const ContactSchema = new Schema<
  IContact,
  ContactModel,
  IContactMethods
>(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = model<IContact, ContactModel>("Contact", ContactSchema);

export default Contact;
