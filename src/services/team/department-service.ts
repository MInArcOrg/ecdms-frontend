import { AxiosResponse } from 'axios';
import Department from 'src/types/department/department';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import TeamMember from 'src/types/team/team-member';

const departmentApiService = {
  getAll: (params: GetRequestParam, parentDepartmentId: string): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/departments?parentId=${parentDepartmentId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/departments/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getDepartmentStructure: (departmentId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/departments-structure/${departmentId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/departments/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: { data: Department; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/departments', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: { data: Department; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/departments/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getDepartmentMembers: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/department-members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  createDepartmentMember: (body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/team/members', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  updateDepartmentMember: (idx: string, body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/team/members/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default departmentApiService;
