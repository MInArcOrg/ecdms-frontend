import { AxiosResponse } from "axios";
import { RoadSafetyFeature } from "src/types/general/general-master";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const roadSafetyFeatureMasterService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadSafetyFeature[]>> =>
    buildGetRequest(`/masterdata/road-safety-features`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/road-safety-features/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/road-safety-features-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as RoadSafetyFeature[],
      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/road-safety-features/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<RoadSafetyFeature>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/road-safety-features`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (
    id: string,
    body: IApiPayload<RoadSafetyFeature>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/road-safety-features/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default roadSafetyFeatureMasterService;
