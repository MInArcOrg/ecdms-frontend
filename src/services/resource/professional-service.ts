import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { Professional } from 'src/types/resource/index';

const professionalApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<Professional[]>> =>
    buildGetRequest('/resources/professionals', params)
      .then((response: AxiosResponse<IApiResponse<Professional[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<Professional>> =>
    buildGetRequest(`/resources/professionals/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<Professional>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professionals/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<Professional>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professionals', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<Professional>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professionals/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default professionalApiService;