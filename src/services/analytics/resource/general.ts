import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const resourceGeneralAnalyticsService = {
    resourcePriceIndex: (baseYear: number, itemId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/resource-price-index?resource_id=${itemId}&baseYear=${baseYear}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

};

export default resourceGeneralAnalyticsService;
