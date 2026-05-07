import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const dashboardApiService = {
  getAgeBasedAnalysis: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/dashboard/age-based-analysis`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getGeneralStats: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/auth/dashboard/general-stats`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getProjectTypeStats: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getContractorsSplit: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/contractors-split`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getContractorsSplitDetails: (key: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/contractors-split/${key}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getConsultantsSplit: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/consultants-split`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getConsultantsSplitDetails: (key: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/consultants-split/${key}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getRoadProjectsSplit: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/road-projects-split`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getBuildingProjectsSplit: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/building-projects-split`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getMachinerySplit: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/departments/user-dashboard/machinery-split`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
};

export default dashboardApiService;
