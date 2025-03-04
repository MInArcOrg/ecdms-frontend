import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { ProjectManager } from "src/types/project/project-manager"

const projectManagerApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectManager[]>> =>
    buildGetRequest("/projects/project-managers", params)
      .then((response: AxiosResponse<IApiResponse<ProjectManager[]>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectManager>> =>
    buildGetRequest(`/projects/project-managers/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<ProjectManager>>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/project-managers/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  create: (body: IApiPayload<ProjectManager>): Promise<IApiResponse> =>
    buildPostRequest("/projects/project-managers", body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),

  update: (id: string, body: IApiPayload<ProjectManager>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/project-managers/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error
      }),
}

export default projectManagerApiService

