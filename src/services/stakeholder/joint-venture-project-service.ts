import type { AxiosResponse } from 'axios';
import type { Project } from 'src/types/project';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';

const jointVentureProjectApiService = {
    getAll: (stakeholderId: string, params: GetRequestParam): Promise<IApiResponse<Project[]>> =>
        buildGetRequest(`/stakeholders/stakeholder-joint-venture-projects/${stakeholderId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (id: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/stakeholders/stakeholder-joint-venture-projects/detail/${id}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    delete: (id: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/stakeholders/stakeholder-joint-venture-projects/${id}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<any>): Promise<IApiResponse> =>
        buildPostRequest('/stakeholders/stakeholder-joint-venture-projects', body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    update: (id: string, body: IApiPayload<any>): Promise<IApiResponse> =>
        buildPutRequest(`/stakeholders/stakeholder-joint-venture-projects/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default jointVentureProjectApiService;
