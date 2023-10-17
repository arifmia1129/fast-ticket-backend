import { HydratedDocument, Model } from "mongoose";

export type IContact = {
  name: string;
  city: string;
  contactNo: string;
  email: string;
  message: string;
};

export type IContactMethods = {
  fullName(): string;
};

export type ContactModel = {
  createWithFullName(): Promise<HydratedDocument<IContact, IContactMethods>>;
  // name: string,
} & Model<IContact, object, IContactMethods>;
