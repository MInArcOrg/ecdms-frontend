import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectPlanReportAnalticsService = {
  getTypeCategoryDepartmentPlanReport: (id: string,type: string,entity: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
    buildGetRequest(`/analytics/project-type-category-departments-plan-report/${id}?type=${type}&entity=${entity}`, params)
      .then((response: AxiosResponse<IApiResponse>) => response.data)
      .catch((error: any) => {
        throw error;
      })
};

export default projectPlanReportAnalticsService;
