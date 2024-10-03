/* eslint-disable prettier/prettier */

import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";
import { EmployeeEducation } from "src/types/stakeholder/employee-education";

const totalEmployeeApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<EmployeeEducation[]>> =>
        buildGetRequest(`/stakeholders/employee-educations`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/employee-educations/${idx}`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/employee-educations/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<EmployeeEducation>): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/employee-educations`, body, false)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<EmployeeEducation>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/employee-educations/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default totalEmployeeApiService;
