import type { AxiosResponse } from "axios"
import type { DesignClassification } from "src/types/general/general-master"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import axiosServices from "src/utils/axios"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"

const designClassificationMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DesignClassification[]>> =>
    buildGetRequest(`/masterdata/design-classifications`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/design-classifications/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/design-classifications-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as DesignClassification[])
      .catch((error: any) => {
        throw error
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/design-classifications/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<DesignClassification>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/design-classifications`, body, false)
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

export default designClassificationMasterService

