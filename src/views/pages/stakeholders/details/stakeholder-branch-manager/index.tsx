'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderBranchManagerApiService from 'src/services/stakeholder/stakeholder-branch-manager-service';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import BranchManagerCard from './stakeholder-branch-manager-card';
import BranchManagerDrawer from './stakeholder-branch-manager-drawer';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { branchManagerColumns } from './stakeholder-branch-manager-row';

interface BranchManagerListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const BranchManagerList: React.FC<BranchManagerListProps> = ({ model, stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderBranchManager | null>(null);
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

  const fetchBranchManagers = (params: GetRequestParam): Promise<IApiResponse<StakeholderBranchManager[]>> => {
    return stakeholderBranchManagerApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: branchManagers,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderBranchManager[]>({
    queryKey: ['branchManagers'],
    fetchFunction: fetchBranchManagers
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderBranchManager);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderBranchManager);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (branchManager: StakeholderBranchManager) => {
    toggleDrawer();
    setSelectedRow(branchManager);
  };

  const handleDelete = async (branchManagerId: string) => {
    await stakeholderBranchManagerApiService.delete(branchManagerId);
    refetch();
  };

  const handleClickDetail = (branchManager: StakeholderBranchManager) => {
    toggleDetailDrawer();
    setSelectedRow(branchManager);
  };

  const getBranchName = (id: string) => {
    if (!stakeholderBranches) return 'N/A';
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : 'N/A';
  };

  const mapBranchManagerToDetailItems = (branchManager: StakeholderBranchManager): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-branch-manager.firstName'),
      value: branchManager.first_name
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.lastName'),
      value: branchManager.last_name
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.department'),
      value: branchManager.department
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.position'),
      value: branchManager.position
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.branch'),
      value: getBranchName(branchManager.stakeholder_branch_id)
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.gender'),
      value: branchManager.gender
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.phone'),
      value: branchManager.phone
    },
    {
      title: t('stakeholder.stakeholder-branch-manager.email'),
      value: branchManager.email || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: branchManager?.created_at ? formatCreatedAt(branchManager.created_at) : 'N/A'
    }
  ];



  return (
    <Box>
      {showDrawer && (
        <BranchManagerDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          branchManager={selectedRow as StakeholderBranchManager}
          refetch={refetch}
          stakeholderId={stakeholderId}
          stakeholderBranches={stakeholderBranches}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBranchManagerToDetailItems(selectedRow as StakeholderBranchManager)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_BRANCH_MANAGER"
          title={t('stakeholder.stakeholder-branch-manager.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-branch-manager.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: branchManagerColumns(handleClickDetail, handleEdit, handleDelete, t, stakeholderBranches, model)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BranchManagerCard
            onDetail={handleClickDetail}
            branchManager={data}
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
        items={branchManagers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BranchManagerList;
