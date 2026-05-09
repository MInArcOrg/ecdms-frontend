import type { AxiosResponse } from 'axios';
import type { ProjectFile } from 'src/types/project/project-file';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const projectFileApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectFile[]>> =>
    buildGetRequest(`/projects/project-files`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectFile[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectFile>> =>
    buildGetRequest(`/projects/project-files/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectFile>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-files/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectFile>): Promise<IApiResponse<ProjectFile>> =>
    buildPostRequest(`/projects/project-files`, body, false)
      .then((response: AxiosResponse<IApiResponse<ProjectFile>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectFile>): Promise<IApiResponse<ProjectFile>> =>
    buildPutRequest(`/projects/project-files/${id}`, body)
      .then((response: AxiosResponse<IApiResponse<ProjectFile>>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectFileApiService;

