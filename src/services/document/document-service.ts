import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import { Document } from 'src/types/document';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const documentApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<Document[]>> =>
    buildGetRequest(`/documents/documents`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/documents/documents/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchDocument: (params: GetRequestParam) =>
    buildGetRequest(`/documents/documents-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as Document[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/documents/documents/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<Document>): Promise<IApiResponse> =>
    buildPostRequest(`/documents/documents`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<Document>): Promise<IApiResponse> =>
    buildPutRequest(`/documents/documents/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
  // uploadImage: (id:string) =>
  //   customAxios.post('/generics/files', formData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   })
};

export default documentApiService;
