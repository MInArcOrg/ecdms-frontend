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
      })
};

export default dashboardApiService;
