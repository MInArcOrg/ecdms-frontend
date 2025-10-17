import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { ResourceBrand } from 'src/types/resource';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const resourceBrandApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ResourceBrand[]>> =>
    buildGetRequest(`/resources/construction-resource-brands`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/resources/construction-resource-brands/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/resources/construction-resource-brands-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ResourceBrand[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/resources/construction-resource-brands/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ResourceBrand>): Promise<IApiResponse> =>
    buildPostRequest(`/resources/construction-resource-brands`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<ResourceBrand>): Promise<IApiResponse> =>
    buildPutRequest(`/resources/construction-resource-brands/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceBrandApiService;
