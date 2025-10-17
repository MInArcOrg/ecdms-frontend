import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { UserEducation } from 'src/types/admin/user';

const userEducationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<UserEducation[]>> =>
    buildGetRequest('/departments/education-statuses', params)
      .then((response: AxiosResponse<IApiResponse<UserEducation[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<UserEducation>> =>
    buildGetRequest(`/departments/education-statuses/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<UserEducation>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/education-statuses/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<UserEducation>): Promise<IApiResponse> =>
    buildPostRequest('/departments/education-statuses', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<UserEducation>): Promise<IApiResponse> =>
    buildPutRequest(`/departments/education-statuses/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default userEducationApiService;
