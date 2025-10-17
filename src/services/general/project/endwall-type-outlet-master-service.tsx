import type { AxiosResponse } from 'axios';
import type { EndwallTypeOutlet } from 'src/types/general/general-master';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const endwallTypeOutletMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<EndwallTypeOutlet[]>> =>
    buildGetRequest(`/masterdata/endwall-type-outlets`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/endwall-type-outlets/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/endwall-type-outlets-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as EndwallTypeOutlet[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/endwall-type-outlets/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<EndwallTypeOutlet>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/endwall-type-outlets`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<EndwallTypeOutlet>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/endwall-type-outlets/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default endwallTypeOutletMasterService;
