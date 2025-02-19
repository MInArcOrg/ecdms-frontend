import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { DesignTrafficFlow } from 'src/types/master/design-traffic-flow';

const designTrafficFlowApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DesignTrafficFlow[]>> =>
    buildGetRequest('/masterdata/design-traffic-flows', params)
      .then((response: AxiosResponse<IApiResponse<DesignTrafficFlow[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<DesignTrafficFlow>> =>
    buildGetRequest(`/masterdata/design-traffic-flows/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<DesignTrafficFlow>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/design-traffic-flows/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DesignTrafficFlow>): Promise<IApiResponse> =>
    buildPostRequest('/masterdata/design-traffic-flows', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<DesignTrafficFlow>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/design-traffic-flows/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default designTrafficFlowApiService;
