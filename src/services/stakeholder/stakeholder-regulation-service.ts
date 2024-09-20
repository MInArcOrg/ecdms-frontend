/* eslint-disable prettier/prettier */
import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderRegulation } from "src/types/stakeholder/stakeholder-regulation";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderRegulationApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderRegulation[]>> =>
        buildGetRequest(`/stakeholders/regulations`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/regulations/${idx}`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/regulations/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<StakeholderRegulation>): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/regulations`, body, false)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<StakeholderRegulation>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/regulations/${id}`, body)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default stakeholderRegulationApiService;
