import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceStudyField } from 'src/types/resource';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const resourceTypeApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceStudyField[]>> =>
    buildGetRequest(`/resources/resource-study-fields`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/resources/resource-study-fields/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/resources/resource-study-fields-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ResourceStudyField[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/resource-study-fields/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourceStudyField>): Promise<IApiResponse> =>
    buildPostRequest(`/resources/resource-study-fields`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<ResourceStudyField>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/resource-study-fields/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceTypeApiService;
