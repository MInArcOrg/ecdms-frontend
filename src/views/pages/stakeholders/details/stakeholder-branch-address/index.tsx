'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderBranchAddressApiService from 'src/services/stakeholder/stakeholder-branch-address-service';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import BranchAddressCard from './stakeholder-branch-address-card';
import BranchAddressDrawer from './stakeholder-branch-address-drawer';
import type { StakeholderBranchAddress } from 'src/types/stakeholder/stakeholder-branch-address';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { branchAddressColumns } from './stakeholder-branch-address-row';

interface BranchAddressListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const BranchAddressList: React.FC<BranchAddressListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderBranchAddress | null>(null);
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

  const fetchBranchAddresses = (params: GetRequestParam): Promise<IApiResponse<StakeholderBranchAddress[]>> => {
    return stakeholderBranchAddressApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: branchAddresses,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderBranchAddress[]>({
    queryKey: ['branchAddresses'],
    fetchFunction: fetchBranchAddresses
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderBranchAddress);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderBranchAddress);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (branchAddress: StakeholderBranchAddress) => {
    toggleDrawer();
    setSelectedRow(branchAddress);
  };

  const handleDelete = async (branchAddressId: string) => {
    await stakeholderBranchAddressApiService.delete(branchAddressId);
    refetch();
  };

  const handleClickDetail = (branchAddress: StakeholderBranchAddress) => {
    toggleDetailDrawer();
    setSelectedRow(branchAddress);
  };

  const getBranchName = (id: string) => {
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : 'N/A';
  };

  const mapBranchAddressToDetailItems = (branchAddress: StakeholderBranchAddress): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-branch-address.country'),
      value: branchAddress.country
    },
    {
      title: t('stakeholder.stakeholder-branch-address.region'),
      value: branchAddress.region
    },
    {
      title: t('stakeholder.stakeholder-branch-address.city'),
      value: branchAddress.city
    },
    {
      title: t('stakeholder.stakeholder-branch-address.subcity'),
      value: branchAddress.subcity
    },
    {
      title: t('stakeholder.stakeholder-branch-address.woreda'),
      value: branchAddress.woreda
    },
    {
      title: t('stakeholder.stakeholder-branch-address.street'),
      value: branchAddress.street || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-branch-address.blockNo'),
      value: branchAddress.block_no || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-branch-address.website'),
      value: branchAddress.website || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-branch-address.northing'),
      value: branchAddress.northing
    },
    {
      title: t('stakeholder.stakeholder-branch-address.easting'),
      value: branchAddress.easting
    },
    {
      title: t('stakeholder.stakeholder-branch-address.branch'),
      value: getBranchName(branchAddress.stakeholder_branch_id)
    },
    {
      title: t('common.table-columns.created-at'),
      value: branchAddress?.created_at ? formatCreatedAt(branchAddress.created_at) : 'N/A'
    }
  ];

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <BranchAddressDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          branchAddress={selectedRow as StakeholderBranchAddress}
          refetch={refetch}
          stakeholderId={stakeholderId}
          stakeholderBranches={stakeholderBranches}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBranchAddressToDetailItems(selectedRow as StakeholderBranchAddress)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="STAKEHOLDER_BRANCH_ADDRESS"
          title={t('stakeholder.stakeholder-branch-address.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-branch-address.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: branchAddressColumns(handleClickDetail, handleEdit, handleDelete, t, stakeholderBranches)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BranchAddressCard
            onDetail={handleClickDetail}
            branchAddress={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            stakeholderBranches={stakeholderBranches}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholderbranchaddress'
          }
        }}
        fetchDataFunction={refetch}
        items={branchAddresses || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BranchAddressList;
