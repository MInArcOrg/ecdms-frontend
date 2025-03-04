import type { AxiosResponse } from "axios"
import type { FunctionalClassification } from "src/types/general/general-master"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import axiosServices from "src/utils/axios"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"

const functionalClassificationMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<FunctionalClassification[]>> =>
    buildGetRequest(`/masterdata/functional-classifications`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/functional-classifications/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/functional-classifications-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as FunctionalClassification[])
      .catch((error: any) => {
        throw error
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/functional-classifications/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<FunctionalClassification>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/functional-classifications`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  update: (id: string, body: IApiPayload<FunctionalClassification>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/functional-classifications/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default functionalClassificationMasterService

