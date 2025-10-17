import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const stakeholderOtherApiService = <T>() => ({
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<T[]>> =>
    buildGetRequest(`/stakeholders/${model}s`, params)
      .then((response: AxiosResponse<IApiResponse<T[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (model: string, idx: string, params: GetRequestParam): Promise<IApiResponse<T>> =>
    buildGetRequest(`/stakeholders/${model}s/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse<T>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (model: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/${model}s/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (model: string, body: { data: T; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`/stakeholders/${model}s`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (model: string, idx: string, body: { data: T; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/${model}s/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
});

export default stakeholderOtherApiService;
