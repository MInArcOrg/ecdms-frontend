import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalContactApiService from 'src/services/resource/professional-contact-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ContactCard from './professional-contact-card';
import ContactDrawer from './professional-contact-drawer';
import { ProfessionalContact } from 'src/types/resource';
import { contactColumns } from './professional-contact-row';

interface ProfessionalContactListProps {
  model: string;
  professionalId: string;
  typeId: string;
}

const ProfessionalContactList: React.FC<ProfessionalContactListProps> = ({ professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalContact | null>(null);
  const { t } = useTranslation();

  console.log('Professional ID:', professionalId);

  const fetchContacts = (params: GetRequestParam): Promise<IApiResponse<ProfessionalContact[]>> => {
    console.log('Fetch params:', {
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });

    return professionalContactApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: contacts,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalContact[]>({
    queryKey: ['contacts'],
    fetchFunction: fetchContacts
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalContact);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalContact);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (contact: ProfessionalContact) => {
    toggleDrawer();
    setSelectedRow(contact);
  };

  const handleDelete = async (contactId: string) => {
    await professionalContactApiService.delete(contactId);
    refetch();
  };

  const handleClickDetail = (contact: ProfessionalContact) => {
    toggleDetailDrawer();
    setSelectedRow(contact);
  };

  const mapContactToDetailItems = (contact: ProfessionalContact): { title: string; value: string }[] => [
    {
      title: t('resources.professional.contact.phone'),
      value: contact?.phone_no || 'N/A'
    },
    { title: t('resources.professional.contact.email'), value: contact?.email || 'N/A' },
    {
      title: t('resources.professional.contact.website'),
      value: contact?.website || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: contact?.created_at ? formatCreatedAt(contact.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ContactDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          contact={selectedRow as ProfessionalContact}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapContactToDetailItems(selectedRow as ProfessionalContact)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="contact"
          title={t('resources.professional.contact.details')}
        />
      )}

      <ItemsListing
        title={t('resources.professional.contact.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: contactColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ContactCard onDetail={handleClickDetail} contact={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'professionalcontact'
          }
        }}
        fetchDataFunction={refetch}
        items={contacts || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProfessionalContactList;
