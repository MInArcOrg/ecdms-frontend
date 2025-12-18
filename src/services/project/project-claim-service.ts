import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { ProjectClaim } from 'src/types/project/project-claim';

const projectClaimApiService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectClaim[]>> =>
        buildGetRequest('/projects/claims', params)
            .then((response: AxiosResponse<IApiResponse<ProjectClaim[]>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getById: (id: string, params: GetRequestParam): Promise<IApiResponse<ProjectClaim>> =>
        buildGetRequest(`/projects/claims/${id}`, params)
            .then((response: AxiosResponse<IApiResponse<ProjectClaim>>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/projects/claims/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<ProjectClaim>): Promise<IApiResponse> =>
        buildPostRequest('/projects/claims', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<ProjectClaim>): Promise<IApiResponse> =>
        buildPutRequest(`/projects/claims/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default projectClaimApiService;
