import { AxiosResponse } from 'axios';
import { MasterCategory } from 'src/types/master/master-types';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const masterCategoryApiService = {
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<MasterCategory[]>> =>
    buildGetRequest(`/masterdata/${model}-categories`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (model: string, idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/${model}-categories/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (model: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/${model}-categories/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (model: string, body: IApiPayload<MasterCategory>): Promise<IApiResponse<MasterCategory>> =>
    buildPostRequest(`/masterdata/${model}-categories`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (model: string, id: string, body: IApiPayload<MasterCategory>): Promise<IApiResponse<MasterCategory>> =>
    buildPutRequest(`/masterdata/${model}-categories/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default masterCategoryApiService;
