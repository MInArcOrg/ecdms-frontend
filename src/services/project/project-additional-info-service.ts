import { AxiosResponse } from 'axios';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';

const projectAdditionalInfoApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectAdditionalInfo[]>> =>
    buildGetRequest('/projects/project-additional-infos', params)
      .then((response: AxiosResponse<IApiResponse<ProjectAdditionalInfo[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectAdditionalInfo>> =>
    buildGetRequest(`/projects/project-additional-infos/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectAdditionalInfo>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-additional-infos/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectAdditionalInfo>): Promise<IApiResponse> =>
    buildPostRequest('/projects/project-additional-infos', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectAdditionalInfo>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-additional-infos/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectAdditionalInfoApiService; 