import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import { ProjectBond } from 'src/types/project/project-finance';

const projectBondApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectBond[]>> =>
    buildGetRequest(`/projects/project-bonds`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/projects/project-bonds/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-bonds/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectBond>): Promise<IApiResponse> =>
    buildPostRequest(`/projects/project-bonds`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectBond>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-bonds/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectBondApiService;
