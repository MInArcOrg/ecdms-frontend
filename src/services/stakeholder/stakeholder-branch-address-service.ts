import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { StakeholderBranchAddress } from 'src/types/stakeholder/stakeholder-branch-address';

const stakeholderBranchAddressApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderBranchAddress[]>> =>
    buildGetRequest('/stakeholders/branch-addresses', params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranchAddress[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderBranchAddress>> =>
    buildGetRequest(`/stakeholders/branch-addresses/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<StakeholderBranchAddress>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/branch-addresses/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderBranchAddress>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/branch-addresses', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<StakeholderBranchAddress>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/branch-addresses/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderBranchAddressApiService;
