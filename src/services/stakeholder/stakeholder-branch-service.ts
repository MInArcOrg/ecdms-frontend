import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';

const stakeholderBranchApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderBranch[]>> =>
    buildGetRequest('/stakeholders/stakeholder-branches', params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranch[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderBranch>> =>
    buildGetRequest(`/stakeholders/stakeholder-branches/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranch>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-branches/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderBranch>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/stakeholder-branches', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<StakeholderBranch>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-branches/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderBranchApiService;
