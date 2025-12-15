import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalMembershipApiService from 'src/services/resource/professional-membership-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import MembershipCard from './professional-membership-card';
import MembershipDrawer from './professional-membership-drawer';
import type { ProfessionalMembership } from 'src/types/resource';
import { membershipColumns } from './professional-membership-row';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

interface ResourceProfessionalMembershipProps {
  professionalId: string;
  typeId: string;
  otherSubMenu?: DetailSubMenuItem;
}

const ResourceProfessionalMembership: React.FC<ResourceProfessionalMembershipProps> = ({ professionalId, otherSubMenu }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalMembership | null>(null);
  const { t } = useTranslation();

  const fetchMemberships = (params: GetRequestParam): Promise<IApiResponse<ProfessionalMembership[]>> => {
    return professionalMembershipApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: memberships,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalMembership[]>({
    queryKey: ['association-memberships'],
    fetchFunction: fetchMemberships
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalMembership);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalMembership);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (membership: ProfessionalMembership) => {
    toggleDrawer();
    setSelectedRow(membership);
  };

  const handleDelete = async (membershipId: string) => {
    await professionalMembershipApiService.delete(membershipId);
    refetch();
  };

  const handleClickDetail = (membership: ProfessionalMembership) => {
    toggleDetailDrawer();
    setSelectedRow(membership);
  };

  const mapMembershipToDetailItems = (membership: ProfessionalMembership): { title: string; value: string }[] => [
    {
      title: t('resources.professional.association-membership.association-name'),
      value: membership.association_name
    },
    {
      title: t('resources.professional.association-membership.membership-type'),
      value: membership.membership_type || 'N/A'
    },
    {
      title: t('resources.professional.association-membership.position'),
      value: membership.position || 'N/A'
    },
    {
      title: t('resources.professional.association-membership.description'),
      value: membership.description || 'N/A'
    },
    {
      title: t('resources.professional.association-membership.registration-date'),
      value: membership.registration_date || 'N/A'
    },
    {
      title: t('resources.professional.association-membership.end-date'),
      value: membership.end_date || 'N/A'
    },
    {
      title: t('common.created-at'),
      value: membership.created_at ? formatCreatedAt(membership.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MembershipDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          membership={selectedRow as ProfessionalMembership}
          refetch={refetch}
          professionalId={professionalId}
          otherSubMenu={otherSubMenu}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMembershipToDetailItems(selectedRow as ProfessionalMembership)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType={otherSubMenu?.type?.toString() || ''}
          title={t('resources.professional.association-membership.details')}
        />
      )}

      <ItemsListing
        title={t('resources.professional.association-membership.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: membershipColumns(handleClickDetail, handleEdit, handleDelete, t, otherSubMenu)
        }}
        isLoading={false}
        ItemViewComponent={({ data }) => (
          <MembershipCard onDetail={handleClickDetail} membership={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} otherSubMenu={otherSubMenu} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || 'ProfessionalMembership'
          }
        }}
        fetchDataFunction={refetch}
        items={memberships || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ResourceProfessionalMembership;
