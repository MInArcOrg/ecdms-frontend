import { AxiosResponse } from 'axios';
import { DrainageType } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const drainageTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DrainageType[]>> =>
    buildGetRequest(`/masterdata/drainage-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/drainage-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/drainage-types-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as DrainageType[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/drainage-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DrainageType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/drainage-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<DrainageType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/drainage-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default drainageTypeMasterService;
