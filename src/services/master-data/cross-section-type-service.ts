import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { CrossSectionType } from "src/types/master/cross-section-type"

const crossSectionTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<CrossSectionType[]>> =>
    buildGetRequest("/masterdata/cross-section-types", params)
      .then((response: AxiosResponse<IApiResponse<CrossSectionType[]>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<CrossSectionType>> =>
    buildGetRequest(`/masterdata/cross-section-types/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<CrossSectionType>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/cross-section-types/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<CrossSectionType>): Promise<IApiResponse> =>
    buildPostRequest("/masterdata/cross-section-types", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  update: (id: string, body: IApiPayload<CrossSectionType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/cross-section-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default crossSectionTypeApiService

