import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';

const stakeholderPositionApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderPosition[]>> =>
    buildGetRequest('/stakeholders/stakeholder-positions', params)
      .then((response: AxiosResponse<IApiResponse<StakeholderPosition[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderPosition>> =>
    buildGetRequest(`/stakeholders/stakeholder-positions/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<StakeholderPosition>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-positions/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderPosition>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/stakeholder-positions', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<StakeholderPosition>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-positions/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderPositionApiService;
