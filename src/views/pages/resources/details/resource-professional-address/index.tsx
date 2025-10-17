import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalAddressApiService from 'src/services/resource/professional-address-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import AddressCard from './professional-address-card';
import AddressDrawer from './professional-address-drawer';
import { ProfessionalAddress } from 'src/types/resource/index';
import { addressColumns } from './professional-address-row';

interface AddressListProps {
  model: string;
  professionalId: string;
  typeId: string;
}

const AddressList: React.FC<AddressListProps> = ({ professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalAddress | null>(null);
  const { t } = useTranslation();

  const fetchAddresses = (params: GetRequestParam): Promise<IApiResponse<ProfessionalAddress[]>> => {
    return professionalAddressApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: addresses,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalAddress[]>({
    queryKey: ['addresses'],
    fetchFunction: fetchAddresses
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalAddress);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalAddress);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (address: ProfessionalAddress) => {
    toggleDrawer();
    setSelectedRow(address);
  };

  const handleDelete = async (addressId: string) => {
    await professionalAddressApiService.delete(addressId);
    refetch();
  };

  const handleClickDetail = (address: ProfessionalAddress) => {
    toggleDetailDrawer();
    setSelectedRow(address);
  };

  const mapAddressToDetailItems = (address: ProfessionalAddress): { title: string; value: string }[] => [
    {
      title: t('professional.address.country'),
      value: address?.country || 'N/A'
    },
    {
      title: t('professional.address.region'),
      value: address?.region || 'N/A'
    },
    { title: t('professional.address.city'), value: address?.city || 'N/A' },
    {
      title: t('professional.address.sub_city'),
      value: address?.sub_city || 'N/A'
    },
    {
      title: t('professional.address.woreda'),
      value: address?.woreda || 'N/A'
    },
    {
      title: t('professional.address.street'),
      value: address?.street || 'N/A'
    },
    {
      title: t('professional.address.block_no'),
      value: address?.block_no || 'N/A'
    },
    {
      title: t('professional.address.website'),
      value: address?.website || 'N/A'
    },
    {
      title: t('professional.address.northing'),
      value: address?.northing?.toString() || 'N/A'
    },
    {
      title: t('professional.address.easting'),
      value: address?.easting?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: address?.created_at ? formatCreatedAt(address.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <AddressDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          address={selectedRow as ProfessionalAddress}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}
      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAddressToDetailItems(selectedRow as ProfessionalAddress)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="address"
          title={t('professional.address.details')}
        />
      )}

      <ItemsListing
        title={t('professional.address.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: addressColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AddressCard onDetail={handleClickDetail} address={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'professionaladdress'
          }
        }}
        fetchDataFunction={refetch}
        items={addresses || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default AddressList;
