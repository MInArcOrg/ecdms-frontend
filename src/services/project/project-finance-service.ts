import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectFinance } from 'src/types/project';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import { ProjectGeneralFinance } from 'src/types/project/project-finance';

const projectFinanceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectFinance[]>> =>
    buildGetRequest(`/projects/project-finances`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-finances/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-finances/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectFinance>): Promise<IApiResponse> =>
    buildPostRequest(`/projects/project-finances`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectFinance>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-finances/${id}`, body)
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
