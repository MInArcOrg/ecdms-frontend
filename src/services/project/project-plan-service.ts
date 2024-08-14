import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import { ProjectGeneralFinance } from 'src/types/project/project-finance';
import { ProjectPlan } from 'src/types/project/project-plan';

const projectPlanApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectPlan[]>> =>
    buildGetRequest(`/projects/project-plans`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-plans/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-plans/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectPlan>): Promise<IApiResponse> =>
    buildPostRequest(`/projects/project-plans`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectPlan>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-plans/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getProjectGeneralFinance: (idx: string, params: GetRequestParam): Promise<IApiResponse<ProjectGeneralFinance>> =>
    buildGetRequest(`/projects/general-project-finance/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectPlanApiService;
