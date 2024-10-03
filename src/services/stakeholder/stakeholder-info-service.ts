/* eslint-disable prettier/prettier */

import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderInfo } from "src/types/stakeholder";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderInfoApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderInfo[]>> =>
    buildGetRequest(`/stakeholders/stakeholder-infos`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/stakeholders/stakeholder-infos/${idx}`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-infos/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderInfo>): Promise<IApiResponse> =>
    buildPostRequest(`/stakeholders/stakeholder-infos`, body, false)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderInfo>
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-infos/${id}`, body)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderInfoApiService;
