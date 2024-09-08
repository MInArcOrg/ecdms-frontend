/* eslint-disable prettier/prettier */

import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderPhone } from "src/types/stakeholder";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderPhoneApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderPhone[]>> =>
        buildGetRequest(`/stakeholders/stakeholder-phones`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/stakeholder-phones/${idx}`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/stakeholder-phones/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<StakeholderPhone>): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/stakeholder-phones`, body, false)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<StakeholderPhone>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/stakeholder-phones/${id}`, body)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default stakeholderPhoneApiService;
