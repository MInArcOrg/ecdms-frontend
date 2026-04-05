import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { MachineryInformation } from 'src/types/resource';

const machineryInformationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<MachineryInformation[]>> =>
    buildGetRequest('/projects/machinery-informations', params)
      .then((response: AxiosResponse<IApiResponse<MachineryInformation[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<MachineryInformation>> =>
    buildGetRequest(`/projects/machinery-informations/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<MachineryInformation>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/machinery-informations/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<MachineryInformation>): Promise<IApiResponse> =>
    buildPostRequest('/projects/machinery-informations', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<MachineryInformation>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/machinery-informations/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default machineryInformationApiService;
