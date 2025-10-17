import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { StakeholderAdditionalInformation } from 'src/types/stakeholder/stakeholder-additional-information';

const stakeholderAdditionalInformationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderAdditionalInformation[]>> =>
    buildGetRequest('/stakeholders/stakeholder-additional-informations', params)
      .then((response: AxiosResponse<IApiResponse<StakeholderAdditionalInformation[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderAdditionalInformation>> =>
    buildGetRequest(`/stakeholders/stakeholder-additional-informations/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<StakeholderAdditionalInformation>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-additional-informations/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderAdditionalInformation>): Promise<IApiResponse> =>
    buildPostRequest('/stakeholders/stakeholder-additional-informations', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<StakeholderAdditionalInformation>): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-additional-informations/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderAdditionalInformationApiService;
