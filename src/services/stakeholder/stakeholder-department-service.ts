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
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department";

const stakeholderDepartmentApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderDepartment[]>> =>
    buildGetRequest("/stakeholders/stakeholder-departments", params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderDepartment[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<StakeholderDepartment>> =>
    buildGetRequest(`/stakeholders/stakeholder-departments/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<StakeholderDepartment>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-departments/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderDepartment>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/stakeholder-departments", body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderDepartment>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-departments/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderDepartmentApiService;
