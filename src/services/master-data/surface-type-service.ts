import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { SurfaceType } from "src/types/master/surface-type"

const surfaceTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<SurfaceType[]>> =>
    buildGetRequest("/masterdata/surface-types", params)
      .then((response: AxiosResponse<IApiResponse<SurfaceType[]>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<SurfaceType>> =>
    buildGetRequest(`/masterdata/surface-types/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<SurfaceType>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/surface-types/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<SurfaceType>): Promise<IApiResponse> =>
    buildPostRequest("/masterdata/surface-types", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  update: (id: string, body: IApiPayload<SurfaceType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/surface-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default surfaceTypeApiService

