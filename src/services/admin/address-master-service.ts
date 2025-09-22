import { AxiosResponse } from "axios";
import { AddressMaster } from "src/types/admin/address";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const addressmasterApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<AddressMaster[]>> =>
    buildGetRequest("/masterdata/address-master-data", params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/address-master-data/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/address-master-data/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: {
    data: AddressMaster;
    files: any[];
  }): Promise<IApiResponse> =>
    buildPostRequest("/masterdata/address-master-data", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: { data: AddressMaster; files: any[] },
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/address-master-data/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default addressmasterApiService;
