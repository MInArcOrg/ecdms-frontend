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
import type { StakeholderMaterial } from "src/types/stakeholder/stackholder-material";

const stakeholderMaterialApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderMaterial[]>> =>
    buildGetRequest("/stakeholders/stakeholder-materials", params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderMaterial[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderMaterial>> =>
    buildGetRequest(`/stakeholders/stakeholder-materials/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderMaterial>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-materials/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderMaterial>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/stakeholder-materials", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderMaterial>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-materials/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderMaterialApiService;
