import type { Pagination } from './pagination';

export type GetRequestParam = {
  pagination?: { pageSize: number; page: number } | null;
  filter?: any;
  sorting?: { property: string; direction: string } | null;
};

export const defaultGetRequestParam: GetRequestParam = {
  pagination: null,
  filter: undefined,
  sorting: undefined
};

export type PostRequestParam = {
  files?: { type: string; file: File }[] | null;
  data?: any | null;
};
export type DeleteRequestParam = {};
export type PutRequestParam<T = any> = {
  data?: T | null;
  published?: any | null;
  archived?: any | null;
};
export interface IAccessToken {
  token: string;
  tokenExpiration: string;
  refreshToken: string;
  refreshTokenExpiration: string;
}

export interface IAuthLogin {
  id: number;
  created_at: string;
  email: string;
  name: string;
  phone: string;
  status: number;
  type: string;
  updatedAt: string;
  deviceToken: string;
  accessToken: IAccessToken;
}

export interface IApiResponse<T = any> {
  [x: string]: any;
  _links: any[] | null;
  _warning: any[] | null;
  _attributes: any | IAttributePagination | null;
  _errors?: string | string[] | { [key: string]: string[] };
  _generated: string | null;
  payload: T;
}
export interface IApiPayload<T = any> {
  data: T;
  files: any[];
}
export interface IAttributePagination {
  pagination: Pagination;
}
