import type { AxiosResponse } from 'axios';
import type { DesignStandard } from 'src/types/general/general-master';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const designStandardMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DesignStandard[]>> =>
    buildGetRequest(`/masterdata/design-standards`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/design-standards/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/design-standards-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as DesignStandard[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/design-standards/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DesignStandard>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/design-standards`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<DesignStandard>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/design-standards/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default designStandardMasterService;
