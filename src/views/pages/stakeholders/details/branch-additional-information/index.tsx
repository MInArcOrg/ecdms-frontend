'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import branchAdditionalInformationApiService from 'src/services/stakeholder/branch-additional-information-service';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import AdditionalInformationCard from './branch-additional-information-card';
import AdditionalInformationDrawer from './branch-additional-information-drawer';
import type { BranchAdditionalInformation } from 'src/types/stakeholder/branch-additional-information';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { additionalInformationColumns } from './branch-additional-information-row';

interface AdditionalInformationListProps {
  stakeholderId: string;
}

const AdditionalInformationList: React.FC<AdditionalInformationListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BranchAdditionalInformation | null>(null);
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

  const fetchAdditionalInformation = (params: GetRequestParam): Promise<IApiResponse<BranchAdditionalInformation[]>> => {
    return branchAdditionalInformationApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: additionalInformations,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BranchAdditionalInformation[]>({
    queryKey: ['additionalInformations'],
    fetchFunction: fetchAdditionalInformation
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BranchAdditionalInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BranchAdditionalInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (additionalInfo: BranchAdditionalInformation) => {
    toggleDrawer();
    setSelectedRow(additionalInfo);
  };

  const handleDelete = async (additionalInfoId: string) => {
    await branchAdditionalInformationApiService.delete(additionalInfoId);
    refetch();
  };

  const handleClickDetail = (additionalInfo: BranchAdditionalInformation) => {
    toggleDetailDrawer();
    setSelectedRow(additionalInfo);
  };

  const getBranchName = (id: string) => {
    if (!stakeholderBranches) return 'N/A';
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : 'N/A';
  };

  const mapAdditionalInformationToDetailItems = (additionalInfo: BranchAdditionalInformation): { title: string; value: string }[] => [
    {
      title: t('stakeholder.branch-additional-information.branch'),
      value: getBranchName(additionalInfo.stakeholder_branch_id)
    },
    {
      title: t('stakeholder.branch-additional-information.additionalInformation'),
      value: additionalInfo.additional_information
    },
    {
      title: t('stakeholder.branch-additional-information.reference'),
      value: additionalInfo.reference || 'N/A'
    }
  ];

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <AdditionalInformationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          additionalInfo={selectedRow as BranchAdditionalInformation}
          refetch={refetch}
          stakeholderId={stakeholderId}
          stakeholderBranches={stakeholderBranches}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAdditionalInformationToDetailItems(selectedRow as BranchAdditionalInformation)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="BRANCH_ADDITIONAL_INFORMATION"
          title={t('stakeholder.branch-additional-information.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.branch-additional-information.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: additionalInformationColumns(handleClickDetail, handleEdit, handleDelete, t, stakeholderBranches)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AdditionalInformationCard
            onDetail={handleClickDetail}
            additionalInfo={data}
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
            subject: 'branchadditionalinformation'
          }
        }}
        fetchDataFunction={refetch}
        items={additionalInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default AdditionalInformationList;
