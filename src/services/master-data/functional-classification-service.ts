import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { FunctionalClassification } from 'src/types/master/functional-classification';

const functionalClassificationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<FunctionalClassification[]>> =>
    buildGetRequest('/masterdata/functional-classifications', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<FunctionalClassification>> =>
    buildGetRequest(`/masterdata/functional-classifications/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/functional-classifications/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<FunctionalClassification>): Promise<IApiResponse> =>
    buildPostRequest('/masterdata/functional-classifications', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<FunctionalClassification>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/functional-classifications/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default functionalClassificationApiService;