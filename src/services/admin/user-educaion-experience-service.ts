import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { UserWorkExperience } from 'src/types/admin/user';

const userWorkExperienceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<UserWorkExperience[]>> =>
    buildGetRequest('/departments/job-experiences', params)
      .then((response: AxiosResponse<IApiResponse<UserWorkExperience[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<UserWorkExperience>> =>
    buildGetRequest(`/departments/job-experiences/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<UserWorkExperience>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/job-experiences/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<UserWorkExperience>): Promise<IApiResponse> =>
    buildPostRequest('/departments/job-experiences', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<UserWorkExperience>): Promise<IApiResponse> =>
    buildPutRequest(`/departments/job-experiences/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default userWorkExperienceApiService;
