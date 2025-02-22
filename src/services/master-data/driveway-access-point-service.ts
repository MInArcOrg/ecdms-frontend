import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { DrivewayAccessPoint } from 'src/types/master/driveway-access-point';

const drivewayAccessPointApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DrivewayAccessPoint[]>> =>
    buildGetRequest('/masterdata/driveway-access-points', params)
      .then((response: AxiosResponse<IApiResponse<DrivewayAccessPoint[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<DrivewayAccessPoint>> =>
    buildGetRequest(`/masterdata/driveway-access-points/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<DrivewayAccessPoint>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/driveway-access-points/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DrivewayAccessPoint>): Promise<IApiResponse> =>
    buildPostRequest('/masterdata/driveway-access-points', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<DrivewayAccessPoint>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/driveway-access-points/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default drivewayAccessPointApiService;
