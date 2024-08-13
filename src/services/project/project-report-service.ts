import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";
import { ProjectGeneralFinance } from "src/types/project/project-finance";
import { ProjectReport } from "src/types/project/project-report";

const projectPlanApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectReport[]>> =>
    buildGetRequest(`/projects/project-reports`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-reports/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-reports/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectReport>): Promise<IApiResponse> =>
    buildPostRequest(`/projects/project-reports`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<ProjectReport>
  ): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-reports/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getProjectGeneralFinance: (
    idx: string,
    params: GetRequestParam
  ): Promise<IApiResponse<ProjectGeneralFinance>> =>
    buildGetRequest(`/projects/general-project-finance/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default projectPlanApiService;
