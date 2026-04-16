import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { Container } from '@mui/system';
import userApiService from 'src/services/admin/user-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { DepartmentProfessional } from 'src/types/admin/user';
import type { GridColDef } from '@mui/x-data-grid';
import { formatCreatedAt } from 'src/utils/formatter/date';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';
import Typography from '@mui/material/Typography';
import { Box as MBox } from '@mui/system';

function ProfessionalList({ parentDepartment }: { parentDepartment: Department }) {
  const { t } = useTranslation();

  const fetchProfessionals = (params: GetRequestParam): Promise<IApiResponse<DepartmentProfessional[]>> => {
    return userApiService.getProfessionalByDepartmentId(parentDepartment.id, params);
  };

  const {
    data: professionals,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DepartmentProfessional[]>({
    queryKey: ['professionals', parentDepartment?.id],
    fetchFunction: fetchProfessionals
  });

  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 220,
      field: 'full_name',
      headerName: 'Full Name',
      renderCell: ({ row }: { row: DepartmentProfessional }) => (
        <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{row.full_name}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'gender',
      headerName: t('department.user.form.gender'),
      renderCell: ({ row }: { row: DepartmentProfessional }) => row.gender
    },
    {
      flex: 0.2,
      minWidth: 170,
      field: 'license_no',
      headerName: 'License No',
      renderCell: ({ row }: { row: DepartmentProfessional }) => row.license_no
    },
    {
      flex: 0.2,
      minWidth: 170,
      field: 'license_grade',
      headerName: 'License Grade',
      renderCell: ({ row }: { row: DepartmentProfessional }) => row.license_grade
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'phone_no',
      headerName: t('department.user.form.phone'),
      renderCell: ({ row }: { row: DepartmentProfessional }) => row.phone_no
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'region_city',
      headerName: 'Location',
      valueGetter: (params) => {
        const row = params.row as DepartmentProfessional;
        return `${row.region || ''}${row.city ? `, ${row.city}` : ''}`.trim();
      }
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: { row: DepartmentProfessional }) => formatCreatedAt(row.created_at)
    }
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}
    >
      <Container>
        <ItemsListing
          ItemViewComponent={({ data }) => (
            <SharedItemViewCard createdAt={data.created_at} t={t}>
              <Typography sx={{ fontWeight: 700, color: 'text.secondary' }}>{data.full_name}</Typography>
              <MBox sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  License No: {data.license_no}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  License Grade: {data.license_grade}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('department.user.form.phone')}: {data.phone_no}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Location: {data.region}
                  {data.city ? `, ${data.city}` : ''}
                </Typography>
              </MBox>
            </SharedItemViewCard>
          )}
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          createActionConfig={{
            ...defaultCreateActionConfig,
            show: false
          }}
          title={t('department.expert.title')}
          fetchDataFunction={refetch}
          tableProps={{
            headers: columns
          }}
          items={professionals || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ProfessionalList;
