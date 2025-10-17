import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import { ProjectGeneralFinance } from 'src/types/project/project-finance';
import { ProjectResource } from 'src/types/project/project-resource';

const projectResourceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectResource[]>> =>
    buildGetRequest(`/projects/project-resources`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-resources/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-resources/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectResource>): Promise<IApiResponse<ProjectResource>> =>
    buildPostRequest(`/projects/project-resources`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectResource>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-resources/${id}`, body)
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

export default projectResourceApiService;
