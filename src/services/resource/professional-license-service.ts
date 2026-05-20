import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalLicense } from 'src/types/resource/index';

const professionalLicenseApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalLicense[]>> =>
        buildGetRequest('/resources/professional-licenses', params)
            .then((response: AxiosResponse<IApiResponse<ProfessionalLicense[]>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalLicense>> =>
        buildGetRequest(`/resources/professional-licenses/${id}`, params)
            .then((response: AxiosResponse<IApiResponse<ProfessionalLicense>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/resources/professional-licenses/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<ProfessionalLicense>): Promise<IApiResponse> =>
        buildPostRequest('/resources/professional-licenses', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<ProfessionalLicense>): Promise<IApiResponse> =>
        buildPutRequest(`/resources/professional-licenses/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default professionalLicenseApiService;
