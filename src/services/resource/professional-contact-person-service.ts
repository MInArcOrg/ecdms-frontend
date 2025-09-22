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
import { ProfessionalContactPerson } from "src/types/resource";

const professionalContactPersonApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProfessionalContactPerson[]>> =>
    buildGetRequest("/resources/professional-contact-people", params)
      .then(
        (response: AxiosResponse<IApiResponse<ProfessionalContactPerson[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<ProfessionalContactPerson>> =>
    buildGetRequest(`/resources/professional-contact-people/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<ProfessionalContactPerson>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-contact-people/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (
    body: IApiPayload<ProfessionalContactPerson>,
  ): Promise<IApiResponse> =>
    buildPostRequest("/resources/professional-contact-people", body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<ProfessionalContactPerson>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-contact-people/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default professionalContactPersonApiService;
