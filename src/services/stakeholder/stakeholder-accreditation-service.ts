/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';

import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const stakeholderAccreditationApiService = {
    getAll: (
        params: GetRequestParam
    ): Promise<IApiResponse<StakeholderAccreditation[]>> =>
        buildGetRequest(`/stakeholders/stakeholder-accreditations`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/stakeholder-accreditations/${idx}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/stakeholder-accreditations/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (
        body: IApiPayload<StakeholderAccreditation>
    ): Promise<IApiResponse> =>
        buildPostRequest(`/stakeholders/stakeholder-accreditations`, body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (
        id: string,
        body: IApiPayload<StakeholderAccreditation>
    ): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/stakeholder-accreditations/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default stakeholderAccreditationApiService;
