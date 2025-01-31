import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalMembership } from 'src/types/resource/index';

const professionalMembershipApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalMembership[]>> =>
    buildGetRequest('/resources/professional-association-memberships', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalMembership[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalMembership>> =>
    buildGetRequest(`/resources/professional-association-memberships/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalMembership>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-association-memberships/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalMembership>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-association-memberships', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalMembership>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-association-memberships/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalMembershipApiService;
