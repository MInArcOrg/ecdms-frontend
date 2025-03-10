import type { AxiosResponse } from "axios"
import type { DeckSlabType } from "src/types/general/general-master"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import axiosServices from "src/utils/axios"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"

const deckSlabTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DeckSlabType[]>> =>
    buildGetRequest(`/masterdata/deck-slab-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/deck-slab-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/deck-slab-types-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as DeckSlabType[])
      .catch((error: any) => {
        throw error
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/deck-slab-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<DeckSlabType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/deck-slab-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
  update: (id: string, body: IApiPayload<DeckSlabType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/deck-slab-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default deckSlabTypeMasterService

