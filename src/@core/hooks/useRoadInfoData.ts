import { useEffect } from 'react';
import roadInfoApiService from 'src/services/road-info/road-info-service';
import { Pagination } from 'src/types/road';
import { GetRequestParam } from 'src/types/requests';

type Action =
  | { type: 'SET_DATA'; payload: any }
  | { type: 'SET_PAGINATION'; payload: Pagination }
  | { type: 'SET_SNACKBAR'; payload: { open: boolean; message: string; severity: string } };

type Dispatch = (action: Action) => void;

type ExtendedGetRequestParam = GetRequestParam & {
  page: number;
  limit: number;
};

const useRoadInfoData = (pagination: Pagination, dispatch: Dispatch) => {
  useEffect(() => {
    const fetchRoadInfo = async () => {
      try {
        const params: ExtendedGetRequestParam = {
          page: pagination.page,
          limit: pagination.pageSize
        };

        const response = await roadInfoApiService.getAll('roadInfoModel', params);
        dispatch({ type: 'SET_DATA', payload: response.payload });
        dispatch({
          type: 'SET_PAGINATION',
          payload: { ...pagination, total: response._attributes.pagination.total }
        });
      } catch {
        dispatch({
          type: 'SET_SNACKBAR',
          payload: { open: true, message: 'Failed to fetch data', severity: 'error' }
        });
      }
    };

    fetchRoadInfo();
  }, [pagination.page, pagination.pageSize, dispatch]);
};

export default useRoadInfoData;
