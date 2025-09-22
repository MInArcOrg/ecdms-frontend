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
import type { ProjectSafetyStatus } from "src/types/project/project-safety-status ";

const projectSafetyStatusApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectSafetyStatus[]>> =>
    buildGetRequest("/projects/project-safety-statuses", params)
      .then(
        (response: AxiosResponse<IApiResponse<ProjectSafetyStatus[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectSafetyStatus>> =>
    buildGetRequest(`/projects/project-safety-statuses/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<ProjectSafetyStatus>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-safety-statuses/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectSafetyStatus>): Promise<IApiResponse> =>
    buildPostRequest("/projects/project-safety-statuses", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<ProjectSafetyStatus>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-safety-statuses/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default projectSafetyStatusApiService;
