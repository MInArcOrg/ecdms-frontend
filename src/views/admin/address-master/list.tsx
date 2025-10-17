import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import addressMasterApiService from 'src/services/admin/address-master-service';
import { AddressMaster, AddressType } from 'src/types/admin/address';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import AddressMasterDrawer from 'src/views/admin/address-master/address-master-drawer';
import { addressMasterColumns } from 'src/views/admin/address-master/address-master-row-column';
import ItemsListing from 'src/views/shared/listing';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Link from 'next/link';

const AddressMasterList = ({ type, parentId }: { type?: AddressType; parentId?: string }) => {
  const [addressMasterDrawerOpen, setAddAddressMasterOpen] = useState<boolean>(false);
  const [editableAddressMaster, setEditableAddressMaster] = useState<AddressMaster>();
  const { t } = useTranslation();
  // Access the hook methods and state
  const fetchAddressMasters = (params: GetRequestParam): Promise<IApiResponse<AddressMaster[]>> => {
    return addressMasterApiService.getAll({
      ...params,
      filter: { ...params.filter, type, parent_address_id: parentId, is_root: !parentId ? 1 : 0 }
    });
  };
  const { data: parentAddressMaster } = useQuery({
    queryKey: ['address-master', parentId],
    queryFn: () => addressMasterApiService.getOne(parentId as string, {}),
    enabled: !!parentId
  });
  const {
    data: addressMasters,
    isLoading,
    pagination,
    refetch
  } = usePaginatedFetch<AddressMaster[]>({
    queryKey: ['address-masters', String(type), String(parentId)],
    fetchFunction: fetchAddressMasters
  });
  const toggleAddressMasterDrawer = () => {
    setEditableAddressMaster({} as AddressMaster);
    setAddAddressMasterOpen(!addressMasterDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await addressMasterApiService.delete(id);
    refetch();
  }
  const handleEdit = (addressMaster: AddressMaster) => {
    toggleAddressMasterDrawer();
    setEditableAddressMaster(addressMaster);
  };
  return (
    <>
      <Grid container spacing={2}>
        {/* LEFT: Parent Address Card */}
        <Grid item xs={12} md={4} lg={3}>
          {parentAddressMaster?.payload && (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                backgroundColor: 'background.paper',
                height: '100%'
              }}
            >
              <CardContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <Typography variant="h4" fontWeight={500}>
                      {parentAddressMaster.payload.title || '-'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t('address-master.columns.type')}
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {parentAddressMaster.payload.type || '-'}
                    </Typography>
                    <Typography
                      href={`/address-master/structure/${parentAddressMaster.payload?.id}`}
                      component={Link}
                      sx={{
                        textDecoration: 'none',
                        display: 'block',
                        color: 'primary.main'
                      }}
                      mb={2}
                    >
                      {t('address-master.address-structure')}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* RIGHT: Items Listing */}
        <Grid item xs={12} md={8} lg={9}>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.table.value}
            title={t(`address-master.${type ? type?.toLocaleLowerCase() : 'all'}`)}
            isLoading={isLoading}
            onCreateClick={toggleAddressMasterDrawer}
            fetchDataFunction={fetchAddressMasters}
            tableProps={{
              headers: addressMasterColumns(handleEdit, handleDelete, t)
            }}
            items={addressMasters || []}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleAddressMasterDrawer,
              onlyIcon: false,
              permission: { action: 'create', subject: 'addressmaster' }
            }}
          />
        </Grid>
      </Grid>

      {/* Drawer */}
      {addressMasterDrawerOpen && (
        <AddressMasterDrawer
          refetch={refetch}
          parentAddressMaster={parentAddressMaster?.payload as AddressMaster}
          type={type as AddressType}
          open={addressMasterDrawerOpen}
          toggle={toggleAddressMasterDrawer}
          addressMaster={editableAddressMaster as AddressMaster}
        />
      )}
    </>
  );
};
AddressMasterList.authGuard = true;
export default AddressMasterList;
