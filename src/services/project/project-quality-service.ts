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
import type { ProjectQuality } from "src/types/project/project-quality";

const projectQualityApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectQuality[]>> =>
    buildGetRequest("/projects/project-qualities", params)
      .then(
        (response: AxiosResponse<IApiResponse<ProjectQuality[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectQuality>> =>
    buildGetRequest(`/projects/project-qualities/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<ProjectQuality>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-qualities/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectQuality>): Promise<IApiResponse> =>
    buildPostRequest("/projects/project-qualities", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<ProjectQuality>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-qualities/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default projectQualityApiService;
