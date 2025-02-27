import { AxiosResponse } from 'axios';
import { PedestrianFacility } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const endwallTypeInletMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<PedestrianFacility[]>> =>
    buildGetRequest(`/masterdata/endwall-type-inlets`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/endwall-type-inlets/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/endwall-type-inlets-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as PedestrianFacility[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/endwall-type-inlets/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/endwall-type-inlets`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  update: (id: string, body: IApiPayload<PedestrianFacility>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/endwall-type-inlets/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default endwallTypeInletMasterService;
