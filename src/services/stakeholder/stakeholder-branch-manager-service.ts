import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';

const stakeholderBranchManagerApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderBranchManager[]>> =>
    buildGetRequest('/stakeholders/branch-managers', params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranchManager[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderBranchManager>> =>
    buildGetRequest(`/stakeholders/branch-managers/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranchManager>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/branch-managers/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderBranchManager>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/branch-managers', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<StakeholderBranchManager>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/branch-managers/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderBranchManagerApiService;
