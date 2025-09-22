import type { AxiosResponse } from "axios";
import type {
  GetRequestParam,
  IApiPayload,
  IApiResponse,
} from "src/types/requests";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";
import axiosServices from "src/utils/axios";
import type { SafetyEquipment } from "src/types/stakeholder/stakeholder-safety-equipment";

const safetyEquipmentApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<SafetyEquipment[]>> =>
    buildGetRequest("/stakeholders/safety-equipments", params)
      .then(
        (response: AxiosResponse<IApiResponse<SafetyEquipment[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<SafetyEquipment>> =>
    buildGetRequest(`/stakeholders/safety-equipments/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<SafetyEquipment>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/safety-equipments/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<SafetyEquipment>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/safety-equipments", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<SafetyEquipment>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/safety-equipments/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default safetyEquipmentApiService;
