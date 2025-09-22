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

const AddressMasterList = ({ type, parentId }: { type?: AddressType; parentId?: string }) => {
  const [addressMasterDrawerOpen, setAddAddressMasterOpen] = useState<boolean>(false);
  const [editableAddressMaster, setEditableAddressMaster] = useState<AddressMaster>();
  const { t } = useTranslation();
  // Access the hook methods and state
  const fetchAddressMasters = (params: GetRequestParam): Promise<IApiResponse<AddressMaster[]>> => {
    return addressMasterApiService.getAll({ ...params, filter: { ...params.filter, type, parent_address_id: parentId } });
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
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        title={t(`address-master.${type ? type?.toLocaleLowerCase() : 'all'}`)}
        isLoading={isLoading}
        onCreateClick={toggleAddressMasterDrawer}
        fetchDataFunction={fetchAddressMasters}
        tableProps={{ headers: addressMasterColumns(handleEdit, handleDelete, t) }}
        items={addressMasters || []}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleAddressMasterDrawer,
          onlyIcon: true,
          permission: { action: 'create', subject: 'addressMaster' }
        }}
      />

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
