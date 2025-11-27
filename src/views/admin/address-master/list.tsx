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

interface AddressMasterListProps {
  type: AddressType;
  parentId?: string;
  parentAddressMaster?: AddressMaster; // Needed for the Drawer to know its parent
}

const AddressMasterList = ({ type, parentId, parentAddressMaster }: AddressMasterListProps) => {
  const { t } = useTranslation();
  console.log('Rendering AddressMasterList with type:', type, 'and parentId:', parentId);
  // --- Local State for Drawer ---
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [editableItem, setEditableItem] = useState<AddressMaster>();
  // --- Data Fetching ---
  const fetchAddressMasters = (params: GetRequestParam): Promise<IApiResponse<AddressMaster[]>> => {
    return addressMasterApiService.getAll({
      ...params,
      filter: { 
        ...params.filter, 
        type: type, // Uses the prop passed from View
        parent_address_id: parentId, 
      }
    });
  };

  const {
    data: addressMasters,
    isLoading,
    pagination,
    refetch
  } = usePaginatedFetch<AddressMaster[]>({
    // Query key depends on 'type' and 'parentId'
    // When the View changes the 'type' prop, this automatically refetches
    queryKey: ['address-masters', String(type), String(parentId)],
    fetchFunction: fetchAddressMasters
  });

  const toggleDrawer = () => {
    setEditableItem({} as AddressMaster);
    setDrawerOpen(!drawerOpen);
  };
  
  const handleEdit = (addressMaster: AddressMaster) => {
    toggleDrawer();
    setEditableItem(addressMaster);
  };
 

  async function handleDelete(id: string): Promise<void> {
    await addressMasterApiService.delete(id);
    refetch();
  }

  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        title={t(`address-master.${type ? type.toLocaleLowerCase() : 'all'}`)}
        isLoading={isLoading}
        onCreateClick={toggleDrawer}
        fetchDataFunction={fetchAddressMasters}
        tableProps={{
          headers: addressMasterColumns(handleEdit, handleDelete, t)
        }}
        items={addressMasters || []}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: { action: 'create', subject: 'addressmaster' }
        }}
      />

      {/* Drawer is now self-contained within the List */}
      {drawerOpen && (
        <AddressMasterDrawer
          refetch={refetch}
          parentAddressMaster={parentAddressMaster as AddressMaster}
          type={type}
          open={drawerOpen}
          toggle={toggleDrawer}
          addressMaster={editableItem as AddressMaster}
        />
      )}
    </>
  );
};

export default AddressMasterList;