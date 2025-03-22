import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProjectConstructionType } from 'src/types/project/project-construction-type';

const projectConstructionTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectConstructionType[]>> =>
    buildGetRequest('/projects/project-construction-types', params)
      .then((response: AxiosResponse<IApiResponse<ProjectConstructionType[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectConstructionType>> =>
    buildGetRequest(`/projects/project-construction-types/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectConstructionType>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-construction-types/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectConstructionType>): Promise<IApiResponse> =>
    buildPostRequest('/projects/project-construction-types', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectConstructionType>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-construction-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectConstructionTypeApiService;
