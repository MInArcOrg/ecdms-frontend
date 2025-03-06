import type { AxiosResponse } from "axios"
import type { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests"
import { buildGetRequest } from "src/utils/requests/get-request"
import { buildPostRequest } from "src/utils/requests/post-request"
import { buildPutRequest } from "src/utils/requests/put-request"
import axiosServices from "src/utils/axios"
import type { StakeholderEmployee } from "src/types/stakeholder/stakeholder-employee"
import type { StakeholderDepartment } from "src/types/stakeholder/stakeholder-department"
import type { StakeholderPosition } from "src/types/stakeholder/stakeholder-positions"

const stakeholderEmployeeApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderEmployee[]>> =>
        buildGetRequest("/stakeholders/stakeholder-employees", params)
            .then((response: AxiosResponse<IApiResponse<StakeholderEmployee[]>>) => response.data)
            .catch((error: any) => {
                throw error
            }),

    getById: (id: string, params: GetRequestParam): Promise<IApiResponse<StakeholderEmployee>> =>
        buildGetRequest(`/stakeholders/stakeholder-employees/${id}`, params)
            .then((response: AxiosResponse<IApiResponse<StakeholderEmployee>>) => response.data)
            .catch((error: any) => {
                throw error
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/stakeholder-employees/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error
            }),

    create: (body: IApiPayload<StakeholderEmployee>): Promise<IApiResponse> =>
        buildPostRequest("/stakeholders/stakeholder-employees", body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error
            }),

    update: (id: string, body: IApiPayload<StakeholderEmployee>): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/stakeholder-employees/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error
            }),
}

export const stakeholderDepartmentApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderDepartment[]>> =>
        buildGetRequest("/stakeholders/stakeholder-departments", params)
            .then((response: AxiosResponse<IApiResponse<StakeholderDepartment[]>>) => response.data)
            .catch((error: any) => {
                throw error
            }),
}

export const stakeholderPositionApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderPosition[]>> =>
        buildGetRequest("/stakeholders/stakeholder-positions", params)
            .then((response: AxiosResponse<IApiResponse<StakeholderPosition[]>>) => response.data)
            .catch((error: any) => {
                throw error
            }),
}

export default stakeholderEmployeeApiService

