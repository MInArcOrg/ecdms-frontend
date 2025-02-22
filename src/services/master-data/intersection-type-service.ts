import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { IntersectionType } from "src/types/master/intersection-type"

const intersectionTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<IntersectionType[]>> =>
    buildGetRequest("/masterdata/intersection-types", params)
      .then((response: AxiosResponse<IApiResponse<IntersectionType[]>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<IntersectionType>> =>
    buildGetRequest(`/masterdata/intersection-types/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<IntersectionType>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/intersection-types/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<IntersectionType>): Promise<IApiResponse> =>
    buildPostRequest("/masterdata/intersection-types", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  update: (id: string, body: IApiPayload<IntersectionType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/intersection-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default intersectionTypeApiService

