import { AxiosResponse } from 'axios';
import Address from 'src/types/member/address';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const addressApiService = {
  getAll: (params: GetRequestParam, parentAddressId: string): Promise<IApiResponse> =>
    buildGetRequest(`/auth/general/address?parentId=${parentAddressId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/general/address/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getByModel: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/general/address/model/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/general/address/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: Address; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/general/address', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: Address; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/general/address/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default addressApiService;
