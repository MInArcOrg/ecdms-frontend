import { AxiosResponse } from 'axios';
import Position from 'src/types/department/position';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const positionApiService = {
  getAll: (params: GetRequestParam, parentPositionId: string): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-positions/positions?parentId=${parentPositionId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-positions/positions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getPositionStructure: (positionId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-positions/positions-structure/${positionId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/user-positions/positions/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/departments/user-positions/positions', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  update: (idx: string, body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/departments/user-positions/positions/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getPositionByDepartmentId: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-positions/position-members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default positionApiService;
