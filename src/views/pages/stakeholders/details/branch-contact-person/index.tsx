'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderBranchContactPersonApiService from 'src/services/stakeholder/branch-contact-person-service';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import BranchContactPersonCard from './branch-contact-person-card';
import BranchContactPersonDrawer from './branch-contact-person-drawer';
import type { StakeholderBranchContactPerson } from 'src/types/stakeholder/branch-contact-person';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { branchContactPersonColumns } from './branch-contact-person-row';

interface BranchContactPersonListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const BranchContactPersonList: React.FC<BranchContactPersonListProps> = ({ stakeholderId, model }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderBranchContactPerson | null>(null);
  const [stakeholderBranches, setStakeholderBranches] = useState<StakeholderBranch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStakeholderBranches = async () => {
      try {
        const response = await stakeholderBranchApiService.getAll({
          filter: { stakeholder_id: stakeholderId }
        });
        setStakeholderBranches(response.payload);
      } catch (error) {
        console.error('Error fetching stakeholder branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStakeholderBranches();
  }, [stakeholderId]);

  const fetchBranchContactPeople = (params: GetRequestParam): Promise<IApiResponse<StakeholderBranchContactPerson[]>> => {
    return stakeholderBranchContactPersonApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: branchContactPeople,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderBranchContactPerson[]>({
    queryKey: ['branchContactPeople'],
    fetchFunction: fetchBranchContactPeople
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderBranchContactPerson);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderBranchContactPerson);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (branchContactPerson: StakeholderBranchContactPerson) => {
    toggleDrawer();
    setSelectedRow(branchContactPerson);
  };

  const handleDelete = async (branchContactPersonId: string) => {
    await stakeholderBranchContactPersonApiService.delete(branchContactPersonId);
    refetch();
  };

  const handleClickDetail = (branchContactPerson: StakeholderBranchContactPerson) => {
    toggleDetailDrawer();
    setSelectedRow(branchContactPerson);
  };

  const getBranchName = (id: string) => {
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : 'N/A';
  };

  const mapBranchContactPersonToDetailItems = (branchContactPerson: StakeholderBranchContactPerson): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-branch-contact-person.firstName'),
      value: branchContactPerson.first_name
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.middleName'),
      value: branchContactPerson.middle_name
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.lastName'),
      value: branchContactPerson.last_name
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.department'),
      value: branchContactPerson.department
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.position'),
      value: branchContactPerson.position
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.gender'),
      value: branchContactPerson.gender
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.phone'),
      value: branchContactPerson.phone
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.email'),
      value: branchContactPerson.email || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-branch-contact-person.branch'),
      value: getBranchName(branchContactPerson.stakeholder_branch_id)
    },
    {
      title: t('common.table-columns.created-at'),
      value: branchContactPerson?.created_at ? formatCreatedAt(branchContactPerson.created_at) : 'N/A'
    }
  ];



  return (
    <Box>
      {showDrawer && (
        <BranchContactPersonDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          branchContactPerson={selectedRow as StakeholderBranchContactPerson}
          refetch={refetch}
          stakeholderId={stakeholderId}
          stakeholderBranches={stakeholderBranches}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBranchContactPersonToDetailItems(selectedRow as StakeholderBranchContactPerson)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="STAKEHOLDER_BRANCH_CONTACT_PERSON"
          title={t('stakeholder.stakeholder-branch-contact-person.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-branch-contact-person.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: branchContactPersonColumns(handleClickDetail, handleEdit, handleDelete, model, t, stakeholderBranches)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BranchContactPersonCard
            onDetail={handleClickDetail}
            branchContactPerson={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            stakeholderBranches={stakeholderBranches}
            model={model}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: model
          }
        }}
        fetchDataFunction={refetch}
        items={branchContactPeople || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BranchContactPersonList;
