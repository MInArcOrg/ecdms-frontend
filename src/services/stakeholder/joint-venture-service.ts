import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';

const jointVentureApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<JointVenture[]>> =>
    buildGetRequest('/stakeholders/joint-ventures', params)
      .then((response: AxiosResponse<IApiResponse<JointVenture[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<JointVenture>> =>
    buildGetRequest(`/stakeholders/joint-ventures/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<JointVenture>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/joint-ventures/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<JointVenture>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/joint-ventures', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<JointVenture>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/joint-ventures/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default jointVentureApiService;
