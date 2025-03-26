import { AxiosResponse } from 'axios';
import { ProjectPhaseType } from 'src/types/general/general-master';
import { GetRequestParam, IApiPayload, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const projectPhaseMasterService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse<ProjectPhaseType[]>> =>
    buildGetRequest(`/masterdata/project-phases`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/masterdata/project-phases/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  searchResource: (params: GetRequestParam) =>
    buildGetRequest(`/masterdata/project-phases-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as ProjectPhaseType[])
      .catch((error: any) => {
        throw error;
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`/masterdata/project-phases/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: IApiPayload<ProjectPhaseType>): Promise<IApiResponse> =>
    buildPostRequest(`/masterdata/project-phases`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: IApiPayload<ProjectPhaseType>): Promise<IApiResponse> =>
    buildPutRequest(`/masterdata/project-phases/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectPhaseMasterService;
