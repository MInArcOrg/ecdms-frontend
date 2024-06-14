import { AxiosResponse } from 'axios';
import AcademicInformation from 'src/types/member/academic-information';
import MemberContact from 'src/types/member/contact';
import LifeTestimoney from 'src/types/member/life-testimoney';
import MaritalStatus from 'src/types/member/marital-status';
import Member from 'src/types/member/member';
import ProfessionalStatus from 'src/types/member/professional-status';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import axiosServices from 'src/utils/axios';
import { buildGetRequest } from 'src/utils/requests/get-request';
import { buildPostRequest } from 'src/utils/requests/post-request';
import { buildPutRequest } from 'src/utils/requests/put-request';

const memberUrl: string = '/auth/members-module';
const memberApiService = {
  getAll: (params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/members`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  getOne: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/members/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  searchMember: (params: GetRequestParam) =>
    buildGetRequest(`${memberUrl}/members-search`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data.payload as unknown as Member[])
      .catch((error: any) => {
        throw error;
      }),
  delete: (idx: string): Promise<IApiResponse> =>
    axiosServices
      .delete(`${memberUrl}/members/${idx}`)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  create: (body: { data: Member; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/members`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  update: (id: string, body: { data: Member; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/members/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  //Contacts
  getMemberContacts: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/contacts/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createMemberContact: (body: { data: MemberContact; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/contacts`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  updateMemberContact: (id: string, body: { data: MemberContact; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/contacts/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  // academic status
  getAcademicInformations: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/academic-informations/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),

  createAcademicInformation: (body: { data: AcademicInformation; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/academic-informations`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateAcademicInformation: (id: string, body: { data: AcademicInformation; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/academic-informations/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  //professional status
  getProfessionalStatuses: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/professional-statuses/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  //Marital status
  getMaritalStatus: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/marital-status/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateMemberStatus: (id: string, body: { data: MaritalStatus; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/marital-status/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  createProfessionalStatus: (body: { data: ProfessionalStatus; files: any[] }): Promise<IApiResponse> =>
    buildPostRequest(`${memberUrl}/professional-statuses`, body, false)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateProfessionalStatus: (id: string, body: { data: ProfessionalStatus; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/professional-statuses/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getMemberFamily: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/family/member/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  getMemberLifeTestimoney: (idx: string, params: GetRequestParam): Promise<IApiResponse> =>
    buildGetRequest(`${memberUrl}/life-tistimoney/${idx}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      }),
  updateMemberLifeTestimoney: (id: string, body: { data: LifeTestimoney; files: any[] }): Promise<IApiResponse> =>
    buildPutRequest(`${memberUrl}/life-tistimoney/${id}`, body)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default memberApiService;
