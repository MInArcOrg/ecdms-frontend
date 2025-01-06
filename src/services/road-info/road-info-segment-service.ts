import { AxiosResponse } from 'axios';
import { RoadSegment } from 'src/types/project/other';
import { IApiResponse, IApiPayload, GetRequestParam } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const roadSegmentApiService = {
  getAll: (model: string, params: GetRequestParam): Promise<IApiResponse<RoadSegment[]>> =>
    buildGetRequest(`/projects/roadsegments`, { ...params })
      .then((response: AxiosResponse<IApiResponse<RoadSegment[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (id: string, model: string, params: GetRequestParam): Promise<IApiResponse<RoadSegment>> =>
    buildGetRequest(`/projects/roadsegments/${id}`, { ...params })
      .then((response: AxiosResponse<IApiResponse<RoadSegment>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (model: string, body: IApiPayload<RoadSegment>): Promise<IApiResponse<RoadSegment>> =>
    buildPostRequest(`/projects/roadsegments`, { ...body }, false)
      .then((response: AxiosResponse<IApiResponse<RoadSegment>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, model: string, body: IApiPayload<RoadSegment>): Promise<IApiResponse<RoadSegment>> =>
    buildPutRequest(`/projects/roadsegments/${id}`, { ...body })
      .then((response: AxiosResponse<IApiResponse<RoadSegment>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string, model: string): Promise<IApiResponse<void>> =>
    axiosServices
      .delete(`/projects/roadsegments/${id}`, { params: { model } })
      .then((response: AxiosResponse<IApiResponse<void>>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default roadSegmentApiService;
