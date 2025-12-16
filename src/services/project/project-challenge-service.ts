import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProjectChallenge } from 'src/types/project/project-challenge';

const projectChallengeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectChallenge[]>> =>
    buildGetRequest('/projects/challenges', params)
      .then((response: AxiosResponse<IApiResponse<ProjectChallenge[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectChallenge>> =>
    buildGetRequest(`/projects/challenges/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectChallenge>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/challenges/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectChallenge>): Promise<IApiResponse> =>
    buildPostRequest('/projects/challenges', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectChallenge>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/challenges/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectChallengeApiService;
