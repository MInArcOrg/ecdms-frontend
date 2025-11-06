import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectAnalticsService = {
  getMatrixTree: (params: GetRequestParam): Promise<IApiResponse<any>> =>
    buildGetRequest(`/projects/matrix/project`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),


};

export default projectAnalticsService;
