import { DataCollectionGuide } from '../../types/general/data-collection-guide';
import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const dataCollectionGuideApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<DataCollectionGuide[]>> =>
    buildGetRequest(`/generics/data-collection-guides`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse<DataCollectionGuide>> =>
    buildGetRequest(`/generics/data-collection-guides/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/generics/data-collection-guides/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<DataCollectionGuide>): Promise<IApiResponse> =>
    buildPostRequest(`/generics/data-collection-guides`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<DataCollectionGuide>): Promise<IApiResponse> =>
    buildPutRequest(`/generics/data-collection-guides/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
  // uploadImage: (id:string) =>
  //   customAxios.post('/generics/data-collection-guides', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
};

export default dataCollectionGuideApiService;
