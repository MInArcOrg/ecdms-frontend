import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { BranchAdditionalInformation } from 'src/types/stakeholder/branch-additional-information';

const branchAdditionalInformationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<BranchAdditionalInformation[]>> =>
    buildGetRequest('/stakeholders/branch-additional-informations', params)
      .then((response: AxiosResponse<IApiResponse<BranchAdditionalInformation[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<BranchAdditionalInformation>> =>
    buildGetRequest(`/stakeholders/branch-additional-informations/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<BranchAdditionalInformation>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/branch-additional-informations/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<BranchAdditionalInformation>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/branch-additional-informations', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<BranchAdditionalInformation>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/branch-additional-informations/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default branchAdditionalInformationApiService;
