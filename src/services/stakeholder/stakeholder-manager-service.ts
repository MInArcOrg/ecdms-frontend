import type { AxiosResponse } from "axios";
import type {
  GetRequestParam,
  IApiPayload,
  IApiResponse,
} from "src/types/requests";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";
import axiosServices from "src/utils/axios";
import type { StakeholderManager } from "src/types/stakeholder/stakeholder-manager";

const stakeholderManagerApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderManager[]>> =>
    buildGetRequest("/stakeholders/stakeholder-managers", params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderManager[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderManager>> =>
    buildGetRequest(`/stakeholders/stakeholder-managers/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderManager>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-managers/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderManager>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/stakeholder-managers", body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderManager>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-managers/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderManagerApiService;
