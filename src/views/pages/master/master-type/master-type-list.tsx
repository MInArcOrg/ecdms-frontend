// components/MasterTypeList.tsx
import { Box, CircularProgress } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterType } from 'src/types/master/master-types';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import MasterDataNavMenu from 'src/views/components/custom/layout/master-data-nav-menu';
import MasterTypeDrawer from './master-type-drawer';

interface MasterTypeListProps {
  model: string;
  selectedType: MasterType | null;
  onTypeSelect: (id: string) => void;
}

const MasterTypeList: React.FC<MasterTypeListProps> = ({ model, selectedType, onTypeSelect }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const fetchMasterType = (params: GetRequestParam): Promise<IApiResponse<MasterType[]>> => {
    return masterTypeApiService.getAll(model, params);
  };

  const {
    data: types,
    isLoading,
    refetch
  } = usePaginatedFetch<MasterType[]>({
    queryKey: ['masterType', model],
    fetchFunction: fetchMasterType
  });

  return (
    <Fragment>
      {showDrawer && (
        <MasterTypeDrawer model={model} open={showDrawer} toggle={toggleDrawer} masterData={{} as MasterType} refetch={refetch} />
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress size={30} />
        </Box>
      ) : types && types.length > 0 ? (
        <MasterDataNavMenu
          activeMenu={{ id: selectedType?.id || '', title: selectedType?.title || '' }}
          menuItems={
            types
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((type) => ({
                id: type.id,
                title: type.title
              })) || []
          }
          setActiveMenu={onTypeSelect}
        />
      ) : (
        <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>{t('common.no-data-available')}</Box>
      )}
    </Fragment>
  );
};

export default MasterTypeList;
