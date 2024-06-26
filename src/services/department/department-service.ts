import { AxiosResponse } from 'axios';
import User from 'src/types/admin/user';
import Department from 'src/types/department/department';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const departmentApiService = {
  getAll: (params: GetRequestParam, parentDepartmentId: string): Promise<IApiResponse> =>
    buildGetRequest(`/departments?parentId=${parentDepartmentId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse<Department>> =>
    buildGetRequest(`/departments/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  searchDepartment: (idx?: string, params?: GetRequestParam): Promise<IApiResponse<Department>> =>
    buildGetRequest(`/departments/search-department/${idx || ''}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getStructure: (departmentId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments-structure/${departmentId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getSubDepartmentsByDepartmentId: (idx: string, params: GetRequestParam): Promise<IApiResponse<Department[]>> =>
    buildGetRequest(`/departments/sub-departments/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: Department; files: any[] }): Promise<IApiResponse<Department>> =>
    buildPostRequest('/departments/departments', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: Department; files: any[] }): Promise<IApiResponse<Department>> =>
    buildPutRequest(`/departments/departments/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getDepartmentHead: (idx?: string, params?: GetRequestParam): Promise<IApiResponse<User>> =>
    buildGetRequest(`/departments/department-head/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getById: (idx?: string, params?: GetRequestParam): Promise<IApiResponse<Department>> =>
    buildGetRequest(`/departments/search-department/${idx || ''}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getDepartmentStructure: (departmentId?: string, params?: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/department-structure${departmentId ? '/' + departmentId : ''}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getAllParentDepartmentsTree: (idx: string, params?: GetRequestParam): Promise<IApiResponse<Department[]>> =>
    buildGetRequest(`/departments/all-parents${idx ? '/' + idx : ''}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default departmentApiService;
