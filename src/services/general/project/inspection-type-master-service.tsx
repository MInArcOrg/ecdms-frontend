import { AxiosResponse } from 'axios';
import { InspectionType } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const inspectionTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<InspectionType[]>> =>
    buildGetRequest(`/masterdata/inspection-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/inspection-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/inspection-types-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as InspectionType[])
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/inspection-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<InspectionType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/inspection-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<InspectionType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/inspection-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default inspectionTypeMasterService;
