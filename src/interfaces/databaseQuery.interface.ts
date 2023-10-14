import { ParsedQs } from "qs";
export type Pagination = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type ResponseWithPagination<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

type FilterValue = string | string[] | null | undefined | ParsedQs | ParsedQs[];

export type Filter = {
  [key: string]: FilterValue | FilterValue[];
};
