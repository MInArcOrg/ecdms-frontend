import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProfessionalRecommendation } from 'src/types/resource/index';

const professionalRecommendationApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<ProfessionalRecommendation[]>> =>
        buildGetRequest('/resources/recommendations', params)
            .then((response: AxiosResponse<IApiResponse<ProfessionalRecommendation[]>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProfessionalRecommendation>> =>
        buildGetRequest(`/resources/recommendations/${id}`, params)
            .then((response: AxiosResponse<IApiResponse<ProfessionalRecommendation>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/resources/recommendations/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<ProfessionalRecommendation>): Promise<IApiResponse> =>
        buildPostRequest('/resources/recommendations', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<ProfessionalRecommendation>): Promise<IApiResponse> =>
        buildPutRequest(`/resources/recommendations/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default professionalRecommendationApiService;
