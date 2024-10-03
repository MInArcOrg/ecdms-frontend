/* eslint-disable prettier/prettier */

import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderOperationLocation } from "src/types/stakeholder/stakeholder-operation-location";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderOperationLocationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderOperationLocation[]>> =>
    buildGetRequest(`/stakeholders/stakeholder-operation-locations`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/stakeholders/stakeholder-operation-locations/${idx}`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholder-operation-locations/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<StakeholderOperationLocation>): Promise<IApiResponse> =>
    buildPostRequest(`/stakeholders/stakeholder-operation-locations`, body, false)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<StakeholderOperationLocation>
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholder-operation-locations/${id}`, body)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderOperationLocationApiService;
