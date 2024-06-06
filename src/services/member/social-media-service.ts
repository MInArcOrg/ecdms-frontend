import { AxiosResponse } from 'axios';
import MemberSocialMedia, { SocialMedia } from 'src/types/member/social-media';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const memberUrl: string = '/auth/members-module';

const socialMediaApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/social-medias`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/social-medias/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`${memberUrl}/social-medias/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  create: (body: { data: SocialMedia; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/social-medias`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  update: (id: string, body: { data: SocialMedia; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/member/social-medias/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),
  getAllMemberSocialMedia: (memberId: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/member/social-medias/${memberId}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  getOneMemberSocialMedia: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/member/social-medias/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  deleteMemberSocialMedia: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`${memberUrl}/member/social-medias/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  createMemberSocialMedia: (body: { data: MemberSocialMedia; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/member/social-medias`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      }),

  updateMemberSocialMedia: (id: string, body: { data: MemberSocialMedia; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/member/social-medias/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw new Error(error);
      })
};

export default socialMediaApiService;
