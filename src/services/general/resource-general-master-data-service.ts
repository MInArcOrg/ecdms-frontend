import { AxiosResponse } from 'axios';
import { ResourceGeneralMaster } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const resourceGeneralMasterDataApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceGeneralMaster[]>> =>
    buildGetRequest(`/masterdata/resource-general-master-data`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getAllResourceResourceGeneralMaster: (params: GetRequestParam): Promise<IApiResponse<ResourceGeneralMaster[]>> =>
    buildGetRequest(`/masterdata/resource-general-master-data`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/resource-general-master-data/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/resource-general-master-data/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourceGeneralMaster>): Promise<IApiResponse<ResourceGeneralMaster>> =>
    buildPostRequest(`/masterdata/resource-general-master-data`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (idx: string, body: IApiPayload<ResourceGeneralMaster>): Promise<IApiResponse<ResourceGeneralMaster>> =>
    buildPutRequest(`/masterdata/resource-general-master-data/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createResourceResourceGeneralMaster: (
    type: string,
    body: IApiPayload<ResourceGeneralMaster>
  ): Promise<IApiResponse<ResourceGeneralMaster>> =>
    buildPostRequest(`/masterdata/resource-general-master-data`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateResourceResourceGeneralMaster: (
    type: string,
    idx: string,
    body: IApiPayload<ResourceGeneralMaster>
  ): Promise<IApiResponse<ResourceGeneralMaster>> =>
    buildPutRequest(`/masterdata/resource-general-master-data/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceGeneralMasterDataApiService;
