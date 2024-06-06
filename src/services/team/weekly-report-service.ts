import { AxiosResponse } from 'axios';
import SmallTeam from 'src/types/team/weekly-report';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const weeklyReportApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-team/weekly-reports`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-team/weekly-reports/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  prepareAttendance: (teamId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-team/weekly-reports/attendance/prepare/web/${teamId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/small-team/weekly-reports/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: { data: SmallTeam; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/small-team/weekly-reports', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: { data: SmallTeam; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/small-team/weekly-reports/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default weeklyReportApiService;
