import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import {
  Pagination,
  Filter,
} from "../../../interfaces/databaseQuery.interface";
import pick from "../../../shared/pick";
import { IContact } from "./contact.interface";
import { contactFilterableField } from "./contact.constant";
import { paginationField } from "../../constant/pagination";
import { ContactService } from "./contact.service";
import httpStatus from "../../../shared/httpStatus";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createContactService(req.body);

  sendResponse<IContact>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Successfully created Contact",
    data: result,
  });
});

const getContact = catchAsync(async (req: Request, res: Response) => {
  const filterData: Filter = pick(req.query, contactFilterableField);
  const paginationOptions: Pagination = pick(req.query, paginationField);

  const result = await ContactService.getContactService(
    filterData,
    paginationOptions,
  );

  sendResponse<IContact[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived all contacts",
    meta: result.meta,
    data: result.data,
  });
});

const getContactById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.getContactByIdService(id);
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully retrived contact with id",
    data: result,
  });
});

const updateContactById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.updateContactByIdService(id, req.body);
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully updated contact with id",
    data: result,
  });
});

const deleteContactById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ContactService.deleteContactByIdService(id);
  sendResponse<IContact>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Successfully deleted contact with id",
    data: result,
  });
});

export const ContactController = {
  createContact,
  getContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
