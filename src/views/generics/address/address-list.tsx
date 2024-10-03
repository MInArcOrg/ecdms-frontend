import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import addressApiService from 'src/services/general/address-service';
import Address from 'src/types/general/address';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import AddressCard from './address-card';
import AddressDrawer from './address-drawer';

function AddressList({ modelId, type }: { modelId: string; type: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<Address | null>(null);
  const { t: transl } = useTranslation();
  const fetchAddresss = (params: GetRequestParam): Promise<IApiResponse<Address[]>> => {
    return addressApiService.getAll({ ...params, filter: { ...params.filter, model_id: modelId } });
  };

  const {
    data: addresss,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Address[]>({
    queryKey: ['addresses'],
    fetchFunction: fetchAddresss
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Address);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (address: Address) => {
    toggleDrawer();
    setSelectedRow(address);
  };
  const handleDelete = async (addressId: string) => {
    await addressApiService.delete(addressId);
    refetch();
  };

  return (
    <Box>
      <Card>
        {showDrawer && (
          <AddressDrawer open={showDrawer} toggle={toggleDrawer} address={selectedRow as Address} refetch={refetch} modelId={modelId} />
        )}
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.list.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <AddressCard
              type={type}
              onDetail={() => {}}
              address={data}
              onDelete={handleDelete}
              onEdit={handleEdit}
              transl={transl}
              refetch={refetch}
            />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'address'
            }
          }}
          fetchDataFunction={refetch}
          items={addresss || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
export default AddressList;
