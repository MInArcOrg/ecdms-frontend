import { AxiosResponse } from 'axios';
import { ModelMenu } from 'src/types/general/model-menu';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const modelMenuApiService = {
  getByTypeId: (id: string, params: GetRequestParam): Promise<ModelMenu[]> =>
    buildGetRequest(`/generics/module-model-menus/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload)
      .catch((error: any) => {
        throw error;
      }),
  getModelsByModule: (type: string, params: GetRequestParam): Promise<IApiResponse<string>> =>
    buildGetRequest(`/generics/module-models/${type}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload)
      .catch((error: any) => {
        throw error;
      }),
  updateModelsbyType: (
    id: string,
    body: {
      data: {
        models: any[];
        module: string;
      };
      files: any[];
    }
  ): Promise<IApiResponse<string>> =>
    buildPutRequest(`/generics/module-model-menus/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload)
      .catch((error: any) => {
        throw error;
      })
};
export default modelMenuApiService;
