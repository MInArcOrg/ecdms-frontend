import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import { ProfessionalAddress } from 'src/types/resource/index';

const professionalAddressApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalAddress[]>> =>
    buildGetRequest('/resources/professional-addresses', params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalAddress[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalAddress>> =>
    buildGetRequest(`/resources/professional-addresses/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProfessionalAddress>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-addresses/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProfessionalAddress>): Promise<IApiResponse> =>
    buildPostRequest('/resources/professional-addresses', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProfessionalAddress>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-addresses/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default professionalAddressApiService;
