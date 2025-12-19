import { AxiosResponse } from 'axios';
import { StakeholderGeneralMaster } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const stakeholderGeneralMasterDataApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderGeneralMaster[]>> =>
    buildGetRequest(`/masterdata/stakeholder-general-master-data`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getAllStakeholderStakeholderGeneralMaster: (params: GetRequestParam): Promise<IApiResponse<StakeholderGeneralMaster[]>> =>
    buildGetRequest(`/masterdata/stakeholder-general-master-data`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/stakeholder-general-master-data/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/stakeholder-general-master-data/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderGeneralMaster>): Promise<IApiResponse<StakeholderGeneralMaster>> =>
    buildPostRequest(`/masterdata/stakeholder-general-master-data`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (idx: string, body: IApiPayload<StakeholderGeneralMaster>): Promise<IApiResponse<StakeholderGeneralMaster>> =>
    buildPutRequest(`/masterdata/stakeholder-general-master-data/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createStakeholderStakeholderGeneralMaster: (
    type: string,
    body: IApiPayload<StakeholderGeneralMaster>
  ): Promise<IApiResponse<StakeholderGeneralMaster>> =>
    buildPostRequest(`/masterdata/stakeholder-general-master-data`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateStakeholderStakeholderGeneralMaster: (
    type: string,
    idx: string,
    body: IApiPayload<StakeholderGeneralMaster>
  ): Promise<IApiResponse<StakeholderGeneralMaster>> =>
    buildPutRequest(`/masterdata/stakeholder-general-master-data/${idx}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default stakeholderGeneralMasterDataApiService;
