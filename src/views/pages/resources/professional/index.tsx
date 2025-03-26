'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalApiService from 'src/services/resource/professional-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProfessionalCard from './professional-card';
import ProfessionalDrawer from './professional-drawer';
import type { Professional } from 'src/types/resource/index';
import { professionalColumns } from './professional-row';

interface ProfessionalListProps {
  model: string;
}

const ProfessionalList: React.FC<ProfessionalListProps> = ({ model }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const fetchProfessionals = (params: GetRequestParam): Promise<IApiResponse<Professional[]>> => {
    return professionalApiService.getAll(params);
  };

  const {
    data: professionals,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Professional[]>({
    queryKey: ['professionals'],
    fetchFunction: fetchProfessionals
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (professional: Professional) => {
    setShowDrawer(true);
  };

  const handleDelete = async (professionalId: string) => {
    await professionalApiService.delete(professionalId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && <ProfessionalDrawer open={showDrawer} toggle={toggleDrawer} refetch={refetch} professional={null} />}

      <ItemsListing
        title={t('resources.professional.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: professionalColumns(handleEdit, handleDelete, t)
        }}
        ItemViewComponent={({ data }) => (
          <ProfessionalCard professional={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'professional'
          }
        }}
        fetchDataFunction={refetch}
        items={professionals || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProfessionalList;
