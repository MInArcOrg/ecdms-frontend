import { AxiosResponse } from 'axios';
import Role from 'src/types/admin/role';
import Permission from 'src/types/admin/role/permission';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const roleApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest('/departments/roles', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/roles/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/roles/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: Role; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/departments/roles', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: Role; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/departments/roles/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getMe: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest('/me', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getPermissionsByRole: (id: string, params: GetRequestParam): Promise<IApiResponse<Permission[]>> =>
    buildGetRequest(`/departments/role-permissions/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  assignPermission: (body: {
    data: { permissions: { id: string; is_selected: boolean }[]; id: string };
    files: any[];
  }): Promise<IApiResponse> =>
    buildPutRequest(`/departments/assign-role-permissions`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default roleApiService;
