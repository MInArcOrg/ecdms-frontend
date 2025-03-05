import { AxiosResponse } from 'axios';
import { ExpansionJointType } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const expansionJointTypeMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ExpansionJointType[]>> =>
    buildGetRequest(`/masterdata/expansion-joint-types`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/expansion-joint-types/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/expansion-joint-types-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ExpansionJointType[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/expansion-joint-types/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ExpansionJointType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/expansion-joint-types`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<ExpansionJointType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/expansion-joint-types/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default expansionJointTypeMasterService;
