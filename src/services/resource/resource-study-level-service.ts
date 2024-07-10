import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceStudyLevel } from 'src/types/resource';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const resourceTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceStudyLevel[]>> =>
    buildGetRequest(`/resources/resource-study-levels`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/resources/resource-study-levels/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/resources/resource-study-levels-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ResourceStudyLevel[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/resource-study-levels/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourceStudyLevel>): Promise<IApiResponse> =>
    buildPostRequest(`/resources/resource-study-levels`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<ResourceStudyLevel>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/resource-study-levels/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceTypeApiService;
