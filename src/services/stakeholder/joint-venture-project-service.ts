import type { AxiosResponse } from 'axios';
import type { Project } from 'src/types/project';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';

const jointVentureProjectApiService = {
    getAll: (jointVentureCompanyId: string, params: GetRequestParam): Promise<IApiResponse<Project[]>> =>
        buildGetRequest(`/projects/project-joint-venture-companies/${jointVentureCompanyId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (id: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/projects/project-joint-venture-companies/detail/${id}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/projects/project-joint-venture-companies/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<any>): Promise<IApiResponse> =>
        buildPostRequest('/projects/project-joint-venture-companies', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<any>): Promise<IApiResponse> =>
        buildPutRequest(`/projects/project-joint-venture-companies/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default jointVentureProjectApiService;
