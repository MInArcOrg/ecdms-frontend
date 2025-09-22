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
import type { StakeholderMachinery } from "src/types/stakeholder/stakeholder-machinery";

const stakeholderMachineryApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderMachinery[]>> =>
    buildGetRequest("/stakeholders/stakeholder-machineries", params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderMachinery[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderMachinery>> =>
    buildGetRequest(`/stakeholders/stakeholder-machineries/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderMachinery>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-machineries/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderMachinery>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/stakeholder-machineries", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderMachinery>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-machineries/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderMachineryApiService;
