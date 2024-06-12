import { AxiosResponse } from 'axios';
import { AuthorizationResponse } from 'src/types/general/model-action';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { Note } from 'src/types/general/note';
export const performCAActions = (model_id: string, model: string, type: string) => `/generics/${type}/${model}/${model_id}`;

const modelActionApiService = {
  getByModelId: (model_id: string, params: GetRequestParam): Promise<IApiResponse<AuthorizationResponse>> =>
    buildGetRequest(`/generics/model-action-data/${model_id}`, params)
      .then((response: AxiosResponse<IApiResponse<AuthorizationResponse>>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  addCAActionNote: (body: { data: Note; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/auth/general/address', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default modelActionApiService;
