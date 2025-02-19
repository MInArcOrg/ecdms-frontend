import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { DesignClassification } from "src/types/master/design-classification"

const designClassificationApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DesignClassification[]>> =>
    buildGetRequest("/masterdata/design-classifications", params)
      .then((response: AxiosResponse<IApiResponse<DesignClassification[]>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<DesignClassification>> =>
    buildGetRequest(`/masterdata/design-classifications/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<DesignClassification>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/design-classifications/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<DesignClassification>): Promise<IApiResponse> =>
    buildPostRequest("/masterdata/design-classifications", body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  update: (id: string, body: IApiPayload<DesignClassification>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/design-classifications/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default designClassificationApiService

