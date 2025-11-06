import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectPerformanceAnalticsService = {
  getFinancialPhysicalPerformanceExpense: (id: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
buildGetRequest(`/analytics/project-type-category-departments-plan-report/${id}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectPerformanceAnalticsService;
