import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { DesignStandard } from 'src/types/master/design-standard';

const designStandardApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DesignStandard[]>> =>
    buildGetRequest('/masterdata/design-standards', params)
      .then((response: AxiosResponse<IApiResponse<DesignStandard[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<DesignStandard>> =>
    buildGetRequest(`/masterdata/design-standards/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<DesignStandard>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/design-standards/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DesignStandard>): Promise<IApiResponse> =>
    buildPostRequest('/masterdata/design-standards', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<DesignStandard>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/design-standards/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default designStandardApiService;
