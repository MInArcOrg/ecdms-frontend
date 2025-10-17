import { AxiosResponse } from 'axios';
import { ActionReply, AuthorizationResponse, ModelAction } from 'src/types/general/model-action';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { Note } from 'src/types/general/note';

const modelActionApiService = {
  performCAActions: (body: { data: ModelAction; files: any[] }, type: string): Promise<IApiResponse<ModelAction>> =>
    buildPostRequest(`/generics/${type}`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getByModelId: (model_id: string, params: GetRequestParam): Promise<IApiResponse<AuthorizationResponse>> =>
    buildGetRequest(`/generics/model-action-data/${model_id}`, params)
      .then((response: AxiosResponse<IApiResponse<AuthorizationResponse>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  addCAActionNote: (body: { data: Note; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest('/generics/notes', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getActionReplies: (model_id: string, params: GetRequestParam): Promise<IApiResponse<ActionReply[]>> =>
    buildGetRequest('/generics/action-replies/' + model_id, params)
      .then((response: AxiosResponse<IApiResponse<ActionReply[]>>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createActionReply: (body: { data: ActionReply; files: [] }): Promise<IApiResponse> =>
    buildPostRequest('/generics/replies', body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default modelActionApiService;
