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
import type { ProfessionalCertification } from "src/types/resource/index";

const professionalCertificationApiService = {
  getAll: (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProfessionalCertification[]>> =>
    buildGetRequest("/resources/professional-certifications", params)
      .then(
        (response: AxiosResponse<IApiResponse<ProfessionalCertification[]>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  getById: (
    id: string,
    params: GetRequestParam,
  ): Promise<IApiResponse<ProfessionalCertification>> =>
    buildGetRequest(`/resources/professional-certifications/${id}`, params)
      .then(
        (response: AxiosResponse<IApiResponse<ProfessionalCertification>>) =>
          response.data,
      )
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/professional-certifications/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (
    body: IApiPayload<ProfessionalCertification>,
  ): Promise<IApiResponse> =>
    buildPostRequest("/resources/professional-certifications", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (
    id: string,
    body: IApiPayload<ProfessionalCertification>,
  ): Promise<IApiResponse> =>
    buildPutRequest(`/resources/professional-certifications/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default professionalCertificationApiService;
