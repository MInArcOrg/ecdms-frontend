import { AxiosResponse } from 'axios';
import { MasterType } from 'src/types/master/master-types';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const masterTypeApiService = {
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<MasterType[]>> =>
    buildGetRequest(`/masterdata/${model}-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (model: string, idx: string, params: GetRequestParam): Promise<IApiResponse<MasterType>> =>
    buildGetRequest(`/masterdata/${model}-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (model: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/${model}-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (model: string, body: IApiPayload<MasterType>): Promise<IApiResponse<MasterType>> =>
    buildPostRequest(`/masterdata/${model}-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (model: string, id: string, body: IApiPayload<MasterType>): Promise<IApiResponse<MasterType>> =>
    buildPutRequest(`/masterdata/${model}-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getOnee: (model: string, idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/${model}-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default masterTypeApiService;
