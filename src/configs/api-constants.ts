import { GetRequestParam } from 'src/types/requests';

export const dropDownConfig = (params: GetRequestParam = {}) => ({
    pagination: { page: 1, pageSize: 50 },
    sort: { field: 'created_at', order: 'desc' },
    ...params
});
