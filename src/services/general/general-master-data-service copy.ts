import { AxiosResponse } from 'axios';
import { GeneralMaster, GeneralMasterResource } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const generalMasterDataApiService = {
  getAll: (type: string, params: GetRequestParam): Promise<IApiResponse<GeneralMaster[]>> =>
    buildGetRequest(`/masterdata/${type}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getAllResourceGeneralMaster: (type: string, params: GetRequestParam): Promise<IApiResponse<GeneralMasterResource[]>> =>
    buildGetRequest(`/masterdata/${type}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, module: string, type: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/${type}/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (type: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/${type}/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (type: string, body: IApiPayload<GeneralMaster>): Promise<IApiResponse<GeneralMaster>> =>
    buildPostRequest(`/masterdata/${type}`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (type: string, idx: string, body: IApiPayload<GeneralMaster>): Promise<IApiResponse<GeneralMaster>> =>
    buildPutRequest(`/masterdata/${type}/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createResourceGeneralMaster: (type: string, body: IApiPayload<GeneralMasterResource>): Promise<IApiResponse<GeneralMasterResource>> =>
    buildPostRequest(`/masterdata/${type}`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateResourceGeneralMaster: (
    type: string,
    idx: string,
    body: IApiPayload<GeneralMasterResource>
  ): Promise<IApiResponse<GeneralMasterResource>> =>
    buildPutRequest(`/masterdata/${type}/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default generalMasterDataApiService;
