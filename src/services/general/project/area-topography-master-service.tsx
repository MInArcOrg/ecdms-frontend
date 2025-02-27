import { AxiosResponse } from 'axios';
import { PedestrianFacility } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const areaTopographyMasterService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<PedestrianFacility[]>> =>
        buildGetRequest(`/masterdata/area-topographies`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/masterdata/area-topographies/${idx}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    searchResource: (params: GetRequestParam) =>
        buildGetRequest(`/masterdata/area-topographies-search`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as PedestrianFacility[])
            .catch((error: any) => {
                throw error;
            }),
    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/masterdata/area-topographies/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
        buildPostRequest(`/masterdata/area-topographies`, body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    update: (id: string, body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
        buildPutRequest(`/masterdata/area-topographies/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default areaTopographyMasterService;
