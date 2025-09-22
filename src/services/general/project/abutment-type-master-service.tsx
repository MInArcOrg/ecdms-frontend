import type { AxiosResponse } from "axios";
import type { AbutmentType } from "src/types/general/general-master";
import type {
  GetRequestParam,
  IApiPayload,
  IApiResponse,
} from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const abutmentTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<AbutmentType[]>> =>
    buildGetRequest(`/masterdata/abutment-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/abutment-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/abutment-types-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as AbutmentType[],
      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/abutment-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<AbutmentType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/abutment-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (
    id: string,
    body: IApiPayload<AbutmentType>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/abutment-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default abutmentTypeMasterService;
