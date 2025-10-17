import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalEducation } from 'src/types/resource/index';

const professionalEducationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalEducation[]>> =>
    buildGetRequest('/resources/professional-educations', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalEducation[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalEducation>> =>
    buildGetRequest(`/resources/professional-educations/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalEducation>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-educations/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalEducation>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-educations', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalEducation>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-educations/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalEducationApiService;
