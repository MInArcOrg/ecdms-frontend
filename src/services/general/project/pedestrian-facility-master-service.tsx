import { AxiosResponse } from 'axios';
import { PedestrianFacility } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const pedestrianFacilityMasterService = {
    getAll: (params: GetRequestParam): Promise<IApiResponse<PedestrianFacility[]>> =>
        buildGetRequest(`/masterdata/pedestrian-facilities`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
        buildGetRequest(`/masterdata/pedestrian-facilities/${idx}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    searchResource: (params: GetRequestParam) =>
        buildGetRequest(`/masterdata/pedestrian-facilities-search`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as PedestrianFacility[])
            .catch((error: any) => {
                throw error;
            }),
    delete: (idx: string): Promise<IApiResponse> =>
        axiosServices
            .delete(`/masterdata/pedestrian-facilities/${idx}`)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

    create: (body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
        buildPostRequest(`/masterdata/pedestrian-facilities`, body, false)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    update: (id: string, body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
        buildPutRequest(`/masterdata/pedestrian-facilities/${id}`, body)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })
};

export default pedestrianFacilityMasterService;
