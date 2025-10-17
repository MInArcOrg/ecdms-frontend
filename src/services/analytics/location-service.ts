import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const locationAnalticsApiService = {
  getLocationCordinates: (baseUrl: string, id: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
    buildGetRequest(`${baseUrl}/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default locationAnalticsApiService;
