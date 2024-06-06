import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import Notice from 'src/types/team/notice';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const noticeBoardService = {
  create: (body: { data: Notice; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/small-team/notice-board', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-team/notice-board`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/small-team/notice-board/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  update: (id: string, body: { data: Notice; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/small-team/notice-board/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/small-team/notice-board/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};
export default noticeBoardService;
