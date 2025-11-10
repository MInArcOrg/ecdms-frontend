import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectGeneralAnalyticsService = {
    projectCategoryMapping: (typeId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/project-catagory-mapping/${typeId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    projectCategoryMappingDepartment: (typeId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/category-distribution-department/project/${typeId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    projectSubcategoryMappingDepartment: (subCategoryId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/subcategory-distribution-department/project/${subCategoryId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })

};

export default projectGeneralAnalyticsService;
