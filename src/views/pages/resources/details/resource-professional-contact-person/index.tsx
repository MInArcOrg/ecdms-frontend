'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalContactPersonApiService from 'src/services/resource/professional-contact-person-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProfessionalContactPersonCard from './professional-contact-person-card';
import ProfessionalContactPersonDrawer from './professional-contact-person-drawer';
import type { ProfessionalContactPerson } from 'src/types/resource/index';
import { professionalContactPersonColumns } from './professional-contact-person-row';

interface ProfessionalContactPersonListProps {
  model: string;
  professionalId: string;
}

const ProfessionalContactPersonList: React.FC<ProfessionalContactPersonListProps> = ({ model, professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalContactPerson | null>(null);
  const { t } = useTranslation();

  const fetchProfessionalContactPeople = (params: GetRequestParam): Promise<IApiResponse<ProfessionalContactPerson[]>> => {
    return professionalContactPersonApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: professionalContactPeople,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalContactPerson[]>({
    queryKey: ['professionalContactPeople', professionalId],
    fetchFunction: fetchProfessionalContactPeople
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (contactPerson: ProfessionalContactPerson) => {
    setSelectedRow(contactPerson);
    setShowDrawer(true);
  };

  const handleDelete = async (contactPersonId: string) => {
    await professionalContactPersonApiService.delete(contactPersonId);
    refetch();
  };

  const handleClickDetail = (contactPerson: ProfessionalContactPerson) => {
    setSelectedRow(contactPerson);
    setShowDetailDrawer(true);
  };

  const mapContactPersonToDetailItems = (contactPerson: ProfessionalContactPerson): { title: string; value: string }[] => [
    {
      title: t('resources.professional.contact-person.firstName'),
      value: contactPerson.first_name
    },
    {
      title: t('resources.professional.contact-person.middleName'),
      value: contactPerson.middle_name || 'N/A'
    },
    {
      title: t('resources.professional.contact-person.lastName'),
      value: contactPerson.last_name
    },
    {
      title: t('resources.professional.contact-person.nationalIdNo'),
      value: contactPerson.national_id_no
    },
    {
      title: t('resources.professional.contact-person.gender'),
      value: contactPerson.gender
    },
    {
      title: t('resources.professional.contact-person.phoneNo'),
      value: contactPerson.phone_no
    },
    {
      title: t('resources.professional.contact-person.email'),
      value: contactPerson.email || 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ProfessionalContactPersonDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          contactPerson={selectedRow}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && selectedRow && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapContactPersonToDetailItems(selectedRow)}
          id={selectedRow.id || ''}
          hasReference={false}
          fileType="PROFESSIONAL_CONTACT_PERSON"
          title={t('resources.professional.contact-person.details')}
        />
      )}

      <ItemsListing
        title={t('resources.professional.contact-person.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: professionalContactPersonColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        ItemViewComponent={({ data }) => (
          <ProfessionalContactPersonCard
            onDetail={handleClickDetail}
            contactPerson={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'professionalcontactperson'
          }
        }}
        fetchDataFunction={refetch}
        items={professionalContactPeople || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProfessionalContactPersonList;
