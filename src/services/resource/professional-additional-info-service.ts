import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalAdditionalInfo } from 'src/types/resource/index';

const professionalAdditionalInfoApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalAdditionalInfo[]>> =>
    buildGetRequest('/resources/professional-additional-information', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalAdditionalInfo[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalAdditionalInfo>> =>
    buildGetRequest(`/resources/professional-additional-information/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalAdditionalInfo>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-additional-information/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalAdditionalInfo>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-additional-information', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalAdditionalInfo>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-additional-information/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalAdditionalInfoApiService;
