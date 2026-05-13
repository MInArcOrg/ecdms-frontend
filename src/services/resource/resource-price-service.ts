import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ResourcePrice } from 'src/types/resource/index';

const resourcePriceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourcePrice[]>> =>
    buildGetRequest('/resources/resource-prices', params)
      .then((response: AxiosResponse<IApiResponse<ResourcePrice[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ResourcePrice>> =>
    buildGetRequest(`/resources/resource-prices/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ResourcePrice>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/resource-prices/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourcePrice>): Promise<IApiResponse> =>
    buildPostRequest('/resources/resource-prices', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ResourcePrice>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/resource-prices/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourcePriceApiService;
