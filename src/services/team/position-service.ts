import { AxiosResponse } from 'axios';
import Position from 'src/types/team/position';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const positionApiService = {
  getAll: (params: GetRequestParam, parentPositionId: string): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/positions?parentId=${parentPositionId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/positions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/auth/teams-module/positions/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/teams-module/positions', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/auth/teams-module/positions/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getPositionMembers: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/teams-module/position-members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default positionApiService;
