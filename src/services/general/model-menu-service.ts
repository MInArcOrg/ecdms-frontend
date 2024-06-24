import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const modelMenuApiService = {
  getByTypeId: (id:string,params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`/generics/module-model-menus/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload)
      .catch((error: any) => {
        throw error;
      }),
    getModelsByModule: (type:string,params: GetRequestParam): Promise<IApiResponse<string>> =>
        buildGetRequest(`/generics/modules-model/${type}`, params)
          .then((response: AxiosResponse<IApiResponse>) => response.data.payload)
          .catch((error: any) => {
            throw error;
          }),
};

export default modelMenuApiService;
