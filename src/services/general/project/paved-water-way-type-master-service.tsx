import type { AxiosResponse } from "axios";
import type { PavedWaterWayType } from "src/types/general/general-master";
import type {
  GetRequestParam,
  IApiPayload,
  IApiResponse,
} from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const pavedWaterWayTypeMasterService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<PavedWaterWayType[]>> =>
    buildGetRequest(`/masterdata/paved-water-way-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/paved-water-way-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/paved-water-way-types-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as PavedWaterWayType[],
      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/paved-water-way-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<PavedWaterWayType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/paved-water-way-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (
    id: string,
    body: IApiPayload<PavedWaterWayType>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/paved-water-way-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default pavedWaterWayTypeMasterService;
