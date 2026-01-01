import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ConstructionMethod } from 'src/types/project/construction-method';

const constructionMethodApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ConstructionMethod[]>> =>
    buildGetRequest('/projects/construction-methods', params)
      .then((response: AxiosResponse<IApiResponse<ConstructionMethod[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ConstructionMethod>> =>
    buildGetRequest(`/projects/construction-methods/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ConstructionMethod>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/construction-methods/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ConstructionMethod>): Promise<IApiResponse> =>
    buildPostRequest('/projects/construction-methods', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ConstructionMethod>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/construction-methods/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default constructionMethodApiService;
