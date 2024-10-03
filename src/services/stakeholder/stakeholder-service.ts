/* eslint-disable prettier/prettier */

import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { Stakeholder } from "src/types/stakeholder";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<Stakeholder[]>> =>
    buildGetRequest(`/stakeholders/stakeholders`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/stakeholders/stakeholders/${idx}`, params)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/stakeholders/stakeholders-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as Stakeholder[]

      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/stakeholders/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<Stakeholder>): Promise<IApiResponse> =>
    buildPostRequest(`/stakeholders/stakeholders`, body, false)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<Stakeholder>
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/stakeholders/${id}`, body)

      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default stakeholderApiService;
