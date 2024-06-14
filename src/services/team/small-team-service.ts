import { AxiosResponse } from 'axios';
import SmallTeam from 'src/types/team/small-team';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import TeamMember from 'src/types/team/team-member';

const smallTeamApiService = {
  getAll: (params: GetRequestParam, parentSmallTeamId: string): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-teams?parentId=${parentSmallTeamId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-teams/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getSmallTeamStructure: (smallTeamId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-teams-structure/${smallTeamId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/small-teams/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: SmallTeam; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/small-teams', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: SmallTeam; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/small-teams/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getSmallTeamMembers: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-teams/members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  assignSmallTeamMember: (body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest('/auth/teams-module/small-teams/members/assign', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateSmallTeamMember: (idx: string, body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/team/members/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getMembersAttendance: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/members-module/attendance/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createWeeklyReport: (body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`/auth/members-module/weekly-report`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  editWeeklyReport: (idx: string, body: { data: TeamMember; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/team/members/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default smallTeamApiService;
