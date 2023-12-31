import mongoose from "mongoose";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import User from "./user.model";
import {
  generateAdminId,
  generateBusOwnerId,
  generatePassengerId,
} from "./user.utils";
import httpStatus from "../../../shared/httpStatus";
import { IAdmin } from "../admin/admin.interface";
import Admin from "../admin/admin.model";
import { IPassenger } from "../passenger/passenger.interface";
import Passenger from "../passenger/passenger.model";
import { IBusOwner } from "../busOwner/busOwner.interface";
import BusOwner from "../busOwner/busOwner.model";
import Permission from "../permission/permission.model";

const createPassengerService = async (
  passengerInfo: IPassenger,
  user: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "passenger";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // try to generate new Passenger id
    const id = await generatePassengerId();

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new Passenger id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    passengerInfo.id = id;
    user.id = id;

    // try to create a new Passenger
    const newPassenger = await Passenger.create([passengerInfo], { session });

    // throw error if new Passenger not created
    // remember newPassenger return an array
    if (!newPassenger.length) {
      throw new ApiError(
        "Failed to create a new Passenger",
        httpStatus.BAD_REQUEST,
      );
    }

    // set Passenger _id to user for reference
    // remember newPassenger return an array
    user.passenger = newPassenger[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate("passenger");
  }
  return userInfo || null;
};

const createBusOwnerService = async (
  busOwnerInfo: IBusOwner,
  user: IUser,
): Promise<IUser | null> => {
  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "bus_owner";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // try to generate new Passenger id
    const id = await generateBusOwnerId();

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new BusOwner id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    busOwnerInfo.id = id;
    user.id = id;

    // try to create a new BusOwner
    const newBusOwner = await BusOwner.create([busOwnerInfo], { session });

    // throw error if new BusOwner not created
    // remember new BusOwner return an array
    if (!newBusOwner.length) {
      throw new ApiError(
        "Failed to create a new faculy",
        httpStatus.BAD_REQUEST,
      );
    }

    // set BusOwner _id to user for reference
    // remember new BusOwner return an array
    user.busOwner = newBusOwner[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate("busOwner");
  }
  return userInfo || null;
};

const createAdminService = async (
  adminInfo: IAdmin,
  user: IUser,
): Promise<IUser | null> => {
  const { permissions } = adminInfo;
  if (Array.isArray(permissions) && permissions.length) {
    for (const permission of permissions) {
      const isExits = await Permission.findById(permission);

      if (!isExits) {
        throw new ApiError(
          "Provided invalid permission",
          httpStatus.BAD_REQUEST,
        );
      }
    }
  }

  // if user don't give password use default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  // set role
  user.role = "admin";

  // start session -> start transaction -> (commit transaction and end session) or (abort transaction and end session)

  let userInfo;

  // start a session
  const session = await mongoose.startSession();

  try {
    // start transaction
    session.startTransaction();

    // try to generate new Passenger id
    const id = await generateAdminId();

    // throw error if generate id process is failed
    if (!id) {
      throw new ApiError(
        "Failed to generate new admin id",
        httpStatus.BAD_REQUEST,
      );
    }

    // set id
    adminInfo.id = id;
    user.id = id;

    // try to create a new admin
    const newAdmin = await Admin.create([adminInfo], { session });

    // throw error if new admin not created
    // remember new admin return an array
    if (!newAdmin.length) {
      throw new ApiError(
        "Failed to create a new admin",
        httpStatus.BAD_REQUEST,
      );
    }

    // set BusOwner _id to user for reference
    // remember new BusOwner return an array
    user.admin = newAdmin[0]._id;

    // try to create new user
    const newUser = await User.create([user], { session });

    userInfo = newUser[0];

    // throw error when failed to create user
    if (!newUser.length) {
      throw new ApiError("Failed to create a new user", httpStatus.BAD_REQUEST);
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (userInfo) {
    userInfo = await User.findOne({ id: userInfo.id }).populate("admin");
  }
  return userInfo || null;
};

const userProfileService = async (payload: {
  userId: string;
  role: string;
}): Promise<IAdmin | IBusOwner | IPassenger | null> => {
  const { userId, role } = payload;

  let res;

  if (role === "passenger") {
    res = await Passenger.findOne({ id: userId });
  } else if (role === "bus_owner") {
    res = await BusOwner.findOne({ id: userId });
  } else if (role === "admin") {
    res = await Admin.findOne({ id: userId });
  }

  if (!res) {
    throw new ApiError("User profile not found", httpStatus.NOT_FOUND);
  }

  return res;
};

export const UserService = {
  createAdminService,
  createBusOwnerService,
  createPassengerService,
  userProfileService,
};
