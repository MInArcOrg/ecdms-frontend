import { AxiosResponse } from 'axios';
import { ProjectPlan } from 'src/types/project/project-plan';
import { MonthlyReport, ProjectReport } from 'src/types/project/project-report';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const projectReportApiService = {
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

  update: (id: string, body: IApiPayload<ProjectReport>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-reports/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getMonthlyProjectReport: (id: string, params: any): Promise<IApiResponse<{ data: MonthlyReport; plan: ProjectPlan }>> =>
    buildGetRequest(`/projects/monthly-project-report/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getReportSummary: (id: string, params: any): Promise<IApiResponse<{ data: MonthlyReport; plan: ProjectPlan }>> =>
    buildGetRequest(`/projects/populate/project-plan/project-reports/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectReportApiService;
