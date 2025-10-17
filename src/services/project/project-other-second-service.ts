import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const projectOtherApiSecondService = <T>() => ({
  getAll: (apiRoute: string = '', params: GetRequestParam): Promise<IApiResponse<T[]>> =>
    buildGetRequest(`/projects/${apiRoute}`, params)
      .then((response: AxiosResponse<IApiResponse<T[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (apiRoute: string = '', idx: string, params: GetRequestParam): Promise<IApiResponse<T>> =>
    buildGetRequest(`/projects/${apiRoute}/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse<T>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (apiRoute: string = '', idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/${apiRoute}/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (apiRoute: string = '', body: { data: T; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`/projects/${apiRoute}`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (apiRoute: string = '', idx: string, body: { data: T; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/projects/${apiRoute}/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
});

export default projectOtherApiSecondService;
