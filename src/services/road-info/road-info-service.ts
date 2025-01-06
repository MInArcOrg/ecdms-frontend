import { AxiosResponse } from 'axios';
import { RoadInfo } from 'src/types/project/other';
import { IApiResponse, IApiPayload, GetRequestParam } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const roadInfoApiService = {
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<RoadInfo[]>> =>
    buildGetRequest(`/projects/roadinfos`, { ...params })
      .then((response: AxiosResponse<IApiResponse<RoadInfo[]>>) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error in getAll:', error);
        throw error;
      }),

  getOne: (id: string, model: string, params: GetRequestParam): Promise<IApiResponse<RoadInfo>> =>
    buildGetRequest(`/projects/roadinfos/${id}`, { ...params })
      .then((response: AxiosResponse<IApiResponse<RoadInfo>>) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error in getOne:', error);
        throw error;
      }),

  create: (model: string, body: IApiPayload<RoadInfo>): Promise<IApiResponse<RoadInfo>> =>
    buildPostRequest(`/projects/roadinfos`, { ...body })
      .then((response: AxiosResponse<IApiResponse<RoadInfo>>) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error in create:', error);
        throw error;
      }),

  update: (id: string, model: string, body: IApiPayload<RoadInfo>): Promise<IApiResponse<RoadInfo>> =>
    buildPutRequest(`/projects/roadinfos/${id}`, { ...body })
      .then((response: AxiosResponse<IApiResponse<RoadInfo>>) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error in update:', error);
        throw error;
      }),

  delete: (id: string, model: string): Promise<IApiResponse<void>> =>
    axiosServices
      .delete(`/projects/roadinfos/${id}`, { params: { model } })
      .then((response: AxiosResponse<IApiResponse<void>>) => {
        return response.data;
      })
      .catch((error: any) => {
        console.error('Error in delete:', error);
        throw error;
      })
};

export default roadInfoApiService;
