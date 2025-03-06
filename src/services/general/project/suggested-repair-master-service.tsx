import { AxiosResponse } from 'axios';
import { SuggestedRepair } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const suggestedRepairMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<SuggestedRepair[]>> =>
    buildGetRequest(`/masterdata/suggested-repairs`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/suggested-repairs/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/suggested-repairs-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as SuggestedRepair[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/suggested-repairs/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<SuggestedRepair>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/suggested-repairs`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<SuggestedRepair>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/suggested-repairs/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default suggestedRepairMasterService;
