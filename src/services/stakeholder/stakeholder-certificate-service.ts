/* eslint-disable prettier/prettier */
import { AxiosResponse } from "axios";
import { GetRequestParam, IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderCertificate } from "src/types/stakeholder/stakeholder-certificate";

import axiosServices from "src/utils/axios";
import { buildGetRequest } from "src/utils/requests/get-request";
import { buildPostRequest } from "src/utils/requests/post-request";
import { buildPutRequest } from "src/utils/requests/put-request";

const stakeholderPhoneApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<StakeholderCertificate[]>> =>
        buildGetRequest(`/stakeholders/certificates`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/certificates/${idx}`, params)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/certificates/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<StakeholderCertificate>): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/certificates`, body, false)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<StakeholderCertificate>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/certificates/${id}`, body)

            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default stakeholderPhoneApiService;
