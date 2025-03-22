import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalWorkExperience } from 'src/types/resource/index';

const professionalWorkExperienceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalWorkExperience[]>> =>
    buildGetRequest('/resources/professional-work-experiences', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalWorkExperience[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalWorkExperience>> =>
    buildGetRequest(`/resources/professional-work-experiences/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalWorkExperience>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-work-experiences/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalWorkExperience>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-work-experiences', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalWorkExperience>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-work-experiences/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalWorkExperienceApiService;
