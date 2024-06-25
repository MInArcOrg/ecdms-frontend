// components/MasterTypeList.tsx
import { Card, CardContent, ListItemButton, ListItemText } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { MasterType } from 'src/types/master/master-types';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import MasterTypeDrawer from './master-type-drawer';

interface MasterTypeListProps {
  model: string;
  selectedType: MasterType | null;
  onTypeSelect: (id: string) => void;
}

const MasterTypeList: React.FC<MasterTypeListProps> = ({ model, selectedType, onTypeSelect }) => {
  const fetchMasterType = (params: GetRequestParam): Promise<IApiResponse<MasterType[]>> => {
    return masterTypeApiService.getAll(model, params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
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
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title="master-data.master-type"
            ItemViewComponent={({ data }) => <ListItemView type={data} onTypeSelect={onTypeSelect} selectedType={selectedType} />}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: `${model}type`
              }
            }}
            fetchDataFunction={refetch}
            items={types || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default MasterTypeList;
const ListItemView = ({
  type,
  onTypeSelect,
  selectedType
}: {
  type: MasterType;
  onTypeSelect: (id: string) => void;
  selectedType: MasterType | null;
}) => {
  return (
    <ListItemButton
      sx={{
        borderRadius: '0.5rem'
      }}
      selected={type.id === selectedType?.id}
      onClick={() => onTypeSelect(type.id)}
    >
      <ListItemText
        primaryTypographyProps={{
          style: {
            color: `${type?.id === selectedType?.id ? '#fff' : ''}`,
            wordWrap: 'break-word',
            maxWidth: '95%'
          }
        }}
        primary={type.title}
      />
    </ListItemButton>
  );
};
