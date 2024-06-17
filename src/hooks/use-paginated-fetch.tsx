import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { defaultGetRequestParam, GetRequestParam, IApiResponse } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';

interface UsePaginatedFetchProps<T> {
  queryKey: string[];
  fetchFunction: (params: GetRequestParam) => Promise<IApiResponse<T>>;
  initialQueryParams?: GetRequestParam;
}

const usePaginatedFetch = <T,>({ queryKey, fetchFunction, initialQueryParams = defaultGetRequestParam }: UsePaginatedFetchProps<T>) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 10,
    total: 0,
    lastPage: 1
  });
  const [queryParams, setQueryParams] = useState<GetRequestParam>({ ...initialQueryParams });

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: [queryKey] });
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () =>
      fetchFunction({ ...defaultGetRequestParam, ...queryParams }).then((response) => {
        setPagination(response._attributes.pagination);
        return response.payload;
      })
  });

  const handlePageChange = (pageSize: number, newPage: number) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        page: newPage,
        pageSize: pageSize
      }
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: {
        page: 1,
        pageSize: newPageSize,
        total: pagination.total,
        lastPage: pagination.lastPage
      }
    }));
  };

  useEffect(() => {
    refetch();
  }, [queryParams]);

  return {
    data,
    isLoading,
    error,
    refetch,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    invalidateQuery
  };
};

export default usePaginatedFetch;
