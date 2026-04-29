import { AxiosResponse } from 'axios';
import CenterDocument from 'src/types/department/center-document';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const centerDocumentApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<CenterDocument[]>> =>
    buildGetRequest('/departments/center-documents', params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (id: string, params: GetRequestParam): Promise<IApiResponse<CenterDocument>> =>
    buildGetRequest(`/departments/center-documents/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  delete: (id: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/departments/center-documents/${id}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<CenterDocument>): Promise<IApiResponse<CenterDocument>> =>
    buildPostRequest('/departments/center-documents', body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<CenterDocument>): Promise<IApiResponse<CenterDocument>> =>
    buildPutRequest(`/departments/center-documents/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default centerDocumentApiService;
