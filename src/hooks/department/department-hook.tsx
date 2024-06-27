import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import departmentApiService from 'src/services/department/department-service';
import { defaultGetRequestParam } from 'src/types/requests';
import { GetRequestParam } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';
import Department from 'src/types/department/department';

const useDepartment = (initialQueryParams: GetRequestParam = defaultGetRequestParam, parentDepartmentId: string = '') => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newDepartment, setNewDepartment] = useState<Department | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>({
    ...initialQueryParams
  });
  const [pageSize, setPageSize] = useState(10);

  const invalidateDepartmentsQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['departments'] });
  };

  const {
    data: allDepartments,
    isLoading: allLoading,
    error: allError,
    refetch
  } = useQuery({
    queryKey: ['departments', queryParams],
    queryFn: () =>
      departmentApiService.getAll({ ...defaultGetRequestParam, ...queryParams }, parentDepartmentId).then((response) => {
        setPagination(response._attributes.pagination);
        return response.payload;
      })
  });

  const handlePageChange = (newPage: number) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        page: newPage,
        pageSize: prevParams.pagination?.pageSize || pageSize
      }
    }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setQueryParams((prevParams) => ({
      ...prevParams,
      pagination: { ...prevParams.pagination, page: 1, pageSize: newPageSize }
    }));
  };

  const fetchDepartments = (nextPageQueryParams: GetRequestParam = defaultGetRequestParam) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...nextPageQueryParams,
      pagination: {
        ...(prevParams.pagination || {}), // Use an empty object as the default value
        ...nextPageQueryParams.pagination,
        page: nextPageQueryParams.pagination?.page || prevParams.pagination?.page || 1,
        pageSize:
          nextPageQueryParams.pagination?.pageSize !== undefined
            ? nextPageQueryParams.pagination.pageSize
            : prevParams.pagination?.pageSize || pageSize
      }
    }));
    refetch();
  };

  const useGetOneDepartment = (departmentId: string) => {
    return useQuery({
      queryKey: ['departments', departmentId],
      queryFn: () => departmentApiService.getOne(departmentId, defaultGetRequestParam).then((response) => response.payload)
    });
  };

  const addNewDepartment = async (body: { data: Department; files: any[] }) => {
    await departmentApiService.create(body);
    setNewDepartment(undefined);
    invalidateDepartmentsQuery();
  };
  const updateDepartment = async (body: { data: Department; files: any[] }) => {
    await departmentApiService.update(body.data.id, body);
    setNewDepartment(undefined);
    invalidateDepartmentsQuery();
  };

  const deleteDepartment = async (departmentId: string) => {
    await departmentApiService.delete(departmentId);
    invalidateDepartmentsQuery();
  };

  return {
    updateDepartment,
    pagination,
    allDepartments,
    newDepartment,
    setNewDepartment,
    isLoading: allLoading,
    error: allError,
    useGetOneDepartment,
    addNewDepartment,
    deleteDepartment,
    fetchDepartments,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  };
};

export default useDepartment;
