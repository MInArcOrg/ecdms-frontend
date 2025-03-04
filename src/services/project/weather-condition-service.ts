import type { AxiosResponse } from 'axios';
import type { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';
import axiosServices from 'src/utils/axios';
import type { WeatherCondition } from 'src/types/project/weather-condition';

const weatherConditionApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<WeatherCondition[]>> =>
    buildGetRequest('/projects/weather-conditions', params)
      .then((response: AxiosResponse<IApiResponse<WeatherCondition[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getById: (id: string, params: GetRequestParam): Promise<IApiResponse<WeatherCondition>> =>
    buildGetRequest(`/projects/weather-conditions/${id}`, params)
      .then((response: AxiosResponse<IApiResponse<WeatherCondition>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/projects/weather-conditions/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<WeatherCondition>): Promise<IApiResponse> =>
    buildPostRequest('/projects/weather-conditions', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<WeatherCondition>): Promise<IApiResponse> =>
    buildPutRequest(`/projects/weather-conditions/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default weatherConditionApiService;