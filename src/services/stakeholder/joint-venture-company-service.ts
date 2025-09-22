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
import type { JointVentureCompany } from "src/types/stakeholder/joint-venture-company";

const jointVentureCompanyApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<JointVentureCompany[]>> =>
    buildGetRequest("/stakeholders/joint-venture-companies", params)
      .then(
        (response: AxiosResponse<IApiResponse<JointVentureCompany[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<JointVentureCompany>> =>
    buildGetRequest(`/stakeholders/joint-venture-companies/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<JointVentureCompany>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/stakeholders/joint-venture-companies/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<JointVentureCompany>): Promise<IApiResponse> =>
    buildPostRequest("/stakeholders/joint-venture-companies", body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<JointVentureCompany>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/stakeholders/joint-venture-companies/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default jointVentureCompanyApiService;
