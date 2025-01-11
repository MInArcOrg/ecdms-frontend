import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ProjectAdditionalInfo, ProjectAdditionalInfoPayload } from 'src/types/project/project-additional-infos';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const projectAdditionalInfosApiService = {
  getAll: (params: GetRequestParam | null = null): Promise<IApiResponse<ProjectAdditionalInfo[]>> =>
    buildGetRequest('projects/project-additional-infos', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (id: string, params: GetRequestParam | null = null): Promise<IApiResponse<ProjectAdditionalInfo>> =>
    buildGetRequest(`projects/project-additional-infos/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectAdditionalInfo>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectAdditionalInfoPayload>): Promise<IApiResponse<ProjectAdditionalInfo>> =>
    buildPostRequest('projects/project-additional-infos', body, false)
      .then((response: AxiosResponse<IApiResponse<ProjectAdditionalInfo>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectAdditionalInfoPayload>): Promise<IApiResponse<ProjectAdditionalInfo>> =>
    buildPutRequest(`projects/project-additional-infos/${id}`, body)
      .then((response: AxiosResponse<IApiResponse<ProjectAdditionalInfo>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`projects/project-additional-infos/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default projectAdditionalInfosApiService;
