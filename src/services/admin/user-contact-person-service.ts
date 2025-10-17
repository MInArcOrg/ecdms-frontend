import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { UserContactPerson } from 'src/types/admin/user';

const userContactPersonApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<UserContactPerson[]>> =>
    buildGetRequest('/departments/contact-persons', params)
      .then((response: AxiosResponse<IApiResponse<UserContactPerson[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<UserContactPerson>> =>
    buildGetRequest(`/departments/contact-persons/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<UserContactPerson>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/contact-persons/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<UserContactPerson>): Promise<IApiResponse> =>
    buildPostRequest('/departments/contact-persons', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<UserContactPerson>): Promise<IApiResponse> =>
    buildPutRequest(`/departments/contact-persons/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default userContactPersonApiService;
