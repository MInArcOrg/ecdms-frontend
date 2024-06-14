import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import TeamMember from 'src/types/team/team-member';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const teamMemberApiService = {
  getAll: (params: GetRequestParam, parentTeamMemberId: string): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/team/members?parentId=${parentTeamMemberId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/team/members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/team/members/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/team/members', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/team/members/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getTeamMemberMembers: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/team-member-members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default teamMemberApiService;
