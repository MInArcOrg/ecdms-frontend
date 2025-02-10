'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import BranchCard from './stakeholder-branch-card';
import BranchDrawer from './stakeholder-branch-drawer';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { BusinessFields } from 'src/types/general/general-master';
import { branchColumns } from './stakeholder-branch-row';

interface BranchListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const BranchList: React.FC<BranchListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderBranch | null>(null);
  const [businessFields, setBusinessFields] = useState<BusinessFields[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchBusinessFields = async () => {
      try {
        const response = await generalMasterDataApiService.getAllResourceGeneralMaster('business-fields', {});
        setBusinessFields(
          response.payload.map((item: any) => ({
            id: item.id,
            title: item.title
          })) as BusinessFields[]
        );
      } catch (error) {
        console.error('Error fetching business fields:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessFields();
  }, []);

  const fetchBranches = (params: GetRequestParam): Promise<IApiResponse<StakeholderBranch[]>> => {
    return stakeholderBranchApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: branches,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderBranch[]>({
    queryKey: ['branches'],
    fetchFunction: fetchBranches
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderBranch);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderBranch);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (branch: StakeholderBranch) => {
    toggleDrawer();
    setSelectedRow(branch);
  };

  const handleDelete = async (branchId: string) => {
    await stakeholderBranchApiService.delete(branchId);
    refetch();
  };

  const handleClickDetail = (branch: StakeholderBranch) => {
    toggleDetailDrawer();
    setSelectedRow(branch);
  };

  const getBusinessFieldTitle = (id: string) => {
    if (!businessFields) return 'N/A';
    const field = businessFields.find((f) => f.id === id);
    return field ? field.title : 'N/A';
  };

  const mapBranchToDetailItems = (branch: StakeholderBranch): { title: string; value: string }[] => [
    { title: t('stakeholder.stakeholder-branch.name'), value: branch.name },
    { title: t('stakeholder.stakeholder-branch.tinNumber'), value: branch.tin_number || 'N/A' },
    { title: t('stakeholder.stakeholder-branch.businessFieldId'), value: getBusinessFieldTitle(branch.business_field_id) },
    { title: t('stakeholder.stakeholder-branch.description'), value: branch.description || 'N/A' },
    { title: t('stakeholder.stakeholder-branch.reference'), value: branch.reference || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: branch?.created_at ? formatCreatedAt(branch.created_at) : 'N/A'
    }
  ];

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <BranchDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          branch={selectedRow as StakeholderBranch}
          refetch={refetch}
          stakeholderId={stakeholderId}
          businessFields={businessFields}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBranchToDetailItems(selectedRow as StakeholderBranch)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_BRANCH"
          title={t('stakeholder.stakeholder-branch.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-branch.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: branchColumns(handleClickDetail, handleEdit, handleDelete, t, businessFields)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BranchCard
            onDetail={handleClickDetail}
            branch={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            businessFields={businessFields}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholderbranch'
          }
        }}
        fetchDataFunction={refetch}
        items={branches || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BranchList;
