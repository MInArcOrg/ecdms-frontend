import { AxiosResponse } from 'axios';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { buildGetRequest } from 'src/utils/requests/get-request';

const projectGeneralAnalyticsService = {
    projectCategoryMapping: (model: string, typeId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/${model}-catagory-mapping/${typeId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    projectCategoryMappingDepartment: (model: string, typeId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/category-distribution-department/${model}/${typeId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),
    projectSubcategoryMappingDepartment: (model: string, subCategoryId: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/analytics/subcategory-distribution-department/${model}/${subCategoryId}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            })

};

export default projectGeneralAnalyticsService;
