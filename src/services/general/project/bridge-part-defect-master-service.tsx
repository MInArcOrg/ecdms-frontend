import type { AxiosResponse } from 'axios';
import type { BridgePartDefect } from 'src/types/general/general-master';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const bridgePartDefectMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<BridgePartDefect[]>> =>
    buildGetRequest(`/masterdata/bridge-part-defects`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/bridge-part-defects/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/bridge-part-defects-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as BridgePartDefect[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/bridge-part-defects/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<BridgePartDefect>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/bridge-part-defects`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<BridgePartDefect>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/bridge-part-defects/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default bridgePartDefectMasterService;
