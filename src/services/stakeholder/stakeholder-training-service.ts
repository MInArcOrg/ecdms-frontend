/* eslint-disable prettier/prettier */
import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderTraining } from "src/types/stakeholder/stakeholder-training";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderPhoneApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderTraining[]>> =>
        buildGetRequest(`/stakeholders/trainings`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/trainings/${idx}`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/trainings/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<StakeholderTraining>): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/trainings`, body, false)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<StakeholderTraining>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/trainings/${id}`, body)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default stakeholderPhoneApiService;
