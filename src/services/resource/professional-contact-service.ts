import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import { ProfessionalContact } from 'src/types/resource/index';

const professionalContactApiService = { 
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalContact[]>> =>
    buildGetRequest('/resources/professional-contacts', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalContact[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalContact>> =>
    buildGetRequest(`/resources/professional-contacts/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalContact>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-contacts/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalContact>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-contacts', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalContact>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-contacts/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalContactApiService;