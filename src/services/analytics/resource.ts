import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const resourceAnalticsService = {
  getMatrixTree: (params: GetRequestParam): Promise<IApiResponse<any>> =>
    buildGetRequest(`/resources/matrix/resource`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default resourceAnalticsService;
