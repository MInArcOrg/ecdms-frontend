import { AxiosResponse } from "axios";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { buildGetRequest } from "src/utils/requests/get-request";

const matrixAnalticsService = {
    getMatrixTree: (module: string, params: GetRequestParam): Promise<IApiResponse<any>> =>
        buildGetRequest(`/matrix/${module}`, params)
            .then((response: AxiosResponse<IApiResponse>) => response.data)
            .catch((error: any) => {
                throw error;
            }),

};

export default matrixAnalticsService;