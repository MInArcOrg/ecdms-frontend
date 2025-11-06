import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectFinanceAnalyticsService = {
    projectTypeProjectFinance: (typeId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/project-type-project-finance/${typeId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    projectCategoryDepartmentsfinance: (categoryId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/project-category-departments-finance/${categoryId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
};

export default projectFinanceAnalyticsService;
