import { AxiosResponse } from 'axios';
import { DrivewayAccessPoint } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const drivewayAccessPointMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DrivewayAccessPoint[]>> =>
    buildGetRequest(`/masterdata/driveway-access-points`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/driveway-access-points/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/driveway-access-points-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as DrivewayAccessPoint[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/driveway-access-points/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DrivewayAccessPoint>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/driveway-access-points`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<DrivewayAccessPoint>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/driveway-access-points/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default drivewayAccessPointMasterService;
