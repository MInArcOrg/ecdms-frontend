import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const resourceGeneralAnalyticsService = {
    resourcePriceIndex: (baseYear: number, resource_id: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/resource-price-index?resource_id=${resource_id}&baseYear=${baseYear}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    resourceInflation: (resource_id: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/resource-price-index?resource_id=${resource_id}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

};

export default resourceGeneralAnalyticsService;
