import { AxiosResponse } from 'axios';
import { GeneralMaster } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const generalMasterDataApiService = {
  getAll: (module: string, type: string, params: GetRequestParam): Promise<IApiResponse<GeneralMaster[]>> =>
    buildGetRequest(`/${module}/${type}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, module: string, type: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/${module}/${type}/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (module: string, type: string, idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/${module}/${type}/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (module: string, type: string, body: IApiPayload<GeneralMaster>): Promise<IApiResponse<GeneralMaster>> =>
    buildPostRequest(`/${module}/${type}`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (module: string, type: string, idx: string, body: IApiPayload<GeneralMaster>): Promise<IApiResponse<GeneralMaster>> =>
    buildPutRequest(`/${module}/${type}/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default generalMasterDataApiService;
