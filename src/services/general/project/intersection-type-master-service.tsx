import { AxiosResponse } from "axios";
import { IntersectionType } from "src/types/general/general-master";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const intersectionTypeMasterService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<IntersectionType[]>> =>
    buildGetRequest(`/masterdata/intersection-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/intersection-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/intersection-types-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as IntersectionType[],
      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/intersection-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<IntersectionType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/intersection-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (
    id: string,
    body: IApiPayload<IntersectionType>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/intersection-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default intersectionTypeMasterService;
