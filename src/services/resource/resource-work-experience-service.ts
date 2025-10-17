import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceWorkExperience } from 'src/types/resource';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const resourceWorkExperienceApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceWorkExperience[]>> =>
    buildGetRequest(`/resources/resource-work-experiences`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/resources/resource-work-experiences/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/resources/resource-work-experiences-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ResourceWorkExperience[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/resource-work-experiences/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourceWorkExperience>): Promise<IApiResponse> =>
    buildPostRequest(`/resources/resource-work-experiences`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<ResourceWorkExperience>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/resource-work-experiences/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceWorkExperienceApiService;
