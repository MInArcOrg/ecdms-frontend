import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import memberApiService from 'src/services/member/member-service';
import Member from 'src/types/member/member';
import { defaultGetRequestParam } from 'src/types/requests';
import { GetRequestParam } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';

const useMember = (
  initialQueryParams: GetRequestParam = { ...defaultGetRequestParam, sorting: { property: 'first_name', direction: 'ASC' } }
) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState<Pagination>();
  const [newMember, setNewMember] = useState<Member | undefined>();
  const [queryParams, setQueryParams] = useState<GetRequestParam>(initialQueryParams);
  const [pageSize, setPageSize] = useState(10);

  const invalidateMembersQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['members'] });
  };

  const {
    data: allMembers,
    isLoading: allLoading,
    error: allError,
    refetch
  } = useQuery({
    queryKey: ['members', queryParams],
    queryFn: () =>
      memberApiService.getAll({ ...defaultGetRequestParam, ...queryParams }).then((response) => {
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

  useEffect(() => {
    console.log('query params', queryParams);
  }, [queryParams]);

  const fetchMembers = (nextPageQueryParams: GetRequestParam = initialQueryParams) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...nextPageQueryParams,
      pagination: {
        ...(prevParams.pagination || {}),
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

  const useGetOneMember = (memberId: string) => {
    return useQuery({
      queryKey: ['members', memberId],
      queryFn: () => memberApiService.getOne(memberId, defaultGetRequestParam).then((response) => response.payload)
    });
  };

  const addNewMember = async (body: { data: Member; files: any[] }) => {
    await memberApiService.create(body);
    setNewMember(undefined);
    invalidateMembersQuery();
  };
  const updateMember = async (body: { data: Member; files: any[] }) => {
    await memberApiService.update(body.data.id, body);
    setNewMember(undefined);
    invalidateMembersQuery();
  };

  const deleteMember = async (memberId: string) => {
    await memberApiService.delete(memberId);
    invalidateMembersQuery();
  };

  return {
    updateMember,
    pagination,
    allMembers,
    newMember,
    setNewMember,
    isLoading: allLoading,
    error: allError,
    useGetOneMember,
    addNewMember,
    deleteMember,
    fetchMembers,
    currentPage: queryParams.pagination?.page || 1,
    pageSize,
    handlePageChange,
    handlePageSizeChange
    // address
  };
};

export default useMember;
