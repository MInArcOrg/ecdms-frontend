import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProjectContactPerson } from 'src/types/project/projext-contact-person';

const projectContactPersonApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectContactPerson[]>> =>
    buildGetRequest('/projects/project-contact-people', params)
      .then((response: AxiosResponse<IApiResponse<ProjectContactPerson[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectContactPerson>> =>
    buildGetRequest(`/projects/project-contact-people/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectContactPerson>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-contact-people/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectContactPerson>): Promise<IApiResponse> =>
    buildPostRequest('/projects/project-contact-people', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectContactPerson>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-contact-people/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectContactPersonApiService;
