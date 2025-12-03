import { AxiosResponse } from 'axios';
import { GetRequestParam } from 'src/types/requests';
import axiosServices from '../axios';

export const buildGetRequest = async (url: string, params: GetRequestParam | null | undefined): Promise<AxiosResponse> => {
  try {
    const requestParams: Record<string, any> = {};

    if (params?.pagination !== null) {
      requestParams.pagination = params?.pagination;
    }

    if (params?.filter !== null) {
      requestParams.filter = params?.filter;
    }

    if (params?.sorting !== null) {
      requestParams.sorting = params?.sorting;
    }

    const response = await axiosServices.get(url, {
      params: requestParams
    });

    return response;
  } catch (error) {
    throw error;
  }
};
export const buildFileGetRequest = async (
  url: string,
  params: GetRequestParam | null | undefined,
): Promise<AxiosResponse<Blob>> => {
  try {
    const requestParams: Record<string, any> = {};

    // Parameter merging logic (same as above)
    if (params) {
      if (params.pagination !== null && params.pagination !== undefined) requestParams.pagination = params.pagination;
      if (params.filter !== null && params.filter !== undefined) requestParams.filter = params.filter;
      if (params.sorting !== null && params.sorting !== undefined) requestParams.sorting = params.sorting;
      // if (params.search !== null && params.search !== undefined) requestParams.search = params.search;
      // if (params.includes !== null && params.includes !== undefined) requestParams.includes = params.includes;
      if (params.export !== null && params.export !== undefined) requestParams.export = params.export;
    }

    // 💡 CRITICAL CHANGE HERE
    const response = await axiosServices.get<Blob>(url, {
      params: requestParams,
      // Force Axios to treat the response body as binary data, not JSON
      responseType: 'blob',
    });

    // The response.data will now be a Blob
    return response;
  } catch (error) {
    throw error;
  }
};