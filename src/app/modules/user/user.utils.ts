import User from "./user.model";

// generate passenger id
const getLastPassengerId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "passenger" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(4) : "0";
};

export const generatePassengerId = async (): Promise<string> => {
  const lastId: string = (await getLastPassengerId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `P-${currentId}`;
};

// generate Bus Owner id
const getLastBusOwnerId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "bus_owner" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateBusOwnerId = async (): Promise<string> => {
  const lastId: string = (await getLastBusOwnerId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `B-${currentId}`;
};

// generate admin id
const getLastAdminId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateAdminId = async (): Promise<string> => {
  const lastId: string = (await getLastAdminId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `A-${currentId}`;
};
