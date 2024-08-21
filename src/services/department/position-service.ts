import { AxiosResponse } from 'axios';
import Position from 'src/types/department/position';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const positionApiService = {
  getAll: (params: GetRequestParam, parentPositionId: string): Promise<IApiResponse<Position[]>> =>
    buildGetRequest(`/departments/positions?parentId=${parentPositionId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse<Position>> =>
    buildGetRequest(`/departments/positions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getPositionStructure: (positionId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/positions-structure/${positionId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/positions/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/departments/positions', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (idx: string, body: { data: Position; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`/departments/positions/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getPositionByDepartmentId: (idx: string, params: GetRequestParam): Promise<IApiResponse<Position[]>> =>
    buildGetRequest(`/departments/department-positions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default positionApiService;
