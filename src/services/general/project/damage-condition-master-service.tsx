import { AxiosResponse } from "axios";
import { DamageCondition } from "src/types/general/general-master";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const damageConditionMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DamageCondition[]>> =>
    buildGetRequest(`/masterdata/damage-conditions`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/damage-conditions/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/damage-conditions-search`, params)
      .then(
        (response: AxiosResponse<IApiResponse>) =>
          response.data.payload as unknown as DamageCondition[],
      )
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/damage-conditions/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DamageCondition>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/damage-conditions`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (
    id: string,
    body: IApiPayload<DamageCondition>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/damage-conditions/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default damageConditionMasterService;
