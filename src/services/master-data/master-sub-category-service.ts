import { AxiosResponse } from 'axios';
import { MasterSubCategory } from 'src/types/master/master-types';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const masterSubCategoryApiService = {
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<MasterSubCategory[]>> =>
    buildGetRequest(`/masterdata/${model}-sub-categories`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getOne: (model: string, idx: string, params: GetRequestParam): Promise<IApiResponse<MasterSubCategory>> =>
    buildGetRequest(`/masterdata/${model}-sub-categories/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (model: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/${model}-sub-categories/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (model: string, body: { data: MasterSubCategory; files: any[] }): Promise<IApiResponse<MasterSubCategory>> =>
    buildPostRequest(`/masterdata/${model}-sub-categories`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (model: string, id: string, body: { data: MasterSubCategory; files: any[] }): Promise<IApiResponse<MasterSubCategory>> =>
    buildPutRequest(`/masterdata/${model}-sub-categories/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default masterSubCategoryApiService;
