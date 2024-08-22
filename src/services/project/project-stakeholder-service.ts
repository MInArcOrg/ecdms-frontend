import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import { ProjectGeneralFinance } from 'src/types/project/project-finance';
import { ProjectStakeholder } from 'src/types/project/project-stakeholder';

const projectFinanceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectStakeholder[]>> =>
    buildGetRequest(`/projects/project-stakeholders`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-stakeholders/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-stakeholders/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectStakeholder>): Promise<IApiResponse> =>
    buildPostRequest(`/projects/project-stakeholders`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectStakeholder>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-stakeholders/${id}`, body)
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

export default projectFinanceApiService;
