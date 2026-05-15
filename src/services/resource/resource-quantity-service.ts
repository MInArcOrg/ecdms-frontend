import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ResourceQuantity } from 'src/types/resource/index';

const resourceQuantityApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceQuantity[]>> =>
        buildGetRequest('/resources/resource-quantities', params)
            .then((response: AxiosResponse<IApiResponse<ResourceQuantity[]>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ResourceQuantity>> =>
        buildGetRequest(`/resources/resource-quantities/${id}`, params)
            .then((response: AxiosResponse<IApiResponse<ResourceQuantity>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/resources/resource-quantities/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<ResourceQuantity>): Promise<IApiResponse> =>
        buildPostRequest('/resources/resource-quantities', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<ResourceQuantity>): Promise<IApiResponse> =>
        buildPutRequest(`/resources/resource-quantities/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default resourceQuantityApiService;
