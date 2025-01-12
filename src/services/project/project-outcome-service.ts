import { AxiosResponse } from 'axios';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';

const projectOutcomeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectOutcome[]>> =>
    buildGetRequest('/projects/project-outcomes', params)
      .then((response: AxiosResponse<IApiResponse<ProjectOutcome[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectOutcome>> =>
    buildGetRequest(`/projects/project-outcomes/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectOutcome>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-outcomes/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectOutcome>): Promise<IApiResponse> =>
    buildPostRequest('/projects/project-outcomes', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectOutcome>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-outcomes/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectOutcomeApiService; 