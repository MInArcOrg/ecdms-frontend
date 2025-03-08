import type { AxiosResponse } from "axios"
import type { CrossSectionType } from "src/types/general/general-master"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import axiosServices from "src/utils/axios"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"

const crossSectionTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<CrossSectionType[]>> =>
    buildGetRequest(`/masterdata/cross-section-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/cross-section-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/cross-section-types-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as CrossSectionType[])
      .catch((error: any) => {
        throw error
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/cross-section-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<CrossSectionType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/cross-section-types`, body, false)
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

export default crossSectionTypeMasterService

