import { AxiosResponse } from 'axios';
import User, { DepartmentProfessional } from 'src/types/admin/user';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const userApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest('/departments/users', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/users/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/users/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: User; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/departments/users', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: User; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/departments/users/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getProfessionalByDepartmentId: (idx: string, params: GetRequestParam): Promise<IApiResponse<User[]>> =>
    buildGetRequest(`/departments/department-users/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  handleAccountAction: (id: string, action: string): Promise<IApiResponse> =>
    axiosServices
      .post(`/departments/account-action/${id}/${action}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  changePassword: ({ old_password, new_password }: { old_password: string, new_password: string }): Promise<IApiResponse> =>
    axiosServices
      .post(`/departments/change-password`, {
        old_password,
        new_password
      })
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default userApiService;
