import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderManagerApiService from 'src/services/stakeholder/stakeholder-manager-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ManagerCard from './stakeholder-manager-card';
import ManagerDrawer from './stakeholder-manager-drawer';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import { managerColumns } from './stakeholder-manager-row';

interface ManagerListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const ManagerList: React.FC<ManagerListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchManagers = (params: GetRequestParam): Promise<IApiResponse<StakeholderManager[]>> => {
    return stakeholderManagerApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: managers,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderManager[]>({
    queryKey: ['managers'],
    fetchFunction: fetchManagers
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderManager);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderManager);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (manager: StakeholderManager) => {
    toggleDrawer();
    setSelectedRow(manager);
  };

  const handleDelete = async (managerId: string) => {
    await stakeholderManagerApiService.delete(managerId);
    refetch();
  };

  const handleClickDetail = (manager: StakeholderManager) => {
    toggleDetailDrawer();
    setSelectedRow(manager);
  };

  const mapManagerToDetailItems = (manager: StakeholderManager): { title: string; value: string }[] => [
    { title: t('stakeholderManager.type'), value: manager.type || 'N/A' },
    { title: t('stakeholderManager.firstName'), value: manager.first_name },
    { title: t('stakeholderManager.middleName'), value: manager.middle_name },
    { title: t('stakeholderManager.lastName'), value: manager.last_name },
    { title: t('stakeholderManager.department'), value: manager.department },
    { title: t('stakeholderManager.position'), value: manager.position || 'N/A' },
    { title: t('stakeholderManager.nationality'), value: manager.nationality || 'N/A' },
    { title: t('stakeholderManager.nationalIdNo'), value: manager.national_id_no || 'N/A' },
    { title: t('stakeholderManager.birthDate'), value: manager.birth_date },
    { title: t('stakeholderManager.gender'), value: manager.gender },
    { title: t('stakeholderManager.phoneNo'), value: manager.phone_no },
    { title: t('stakeholderManager.email'), value: manager.email },
    {
      title: t('common.table-columns.created-at'),
      value: manager?.created_at ? formatCreatedAt(manager.created_at) : 'N/A'
    }
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <ManagerDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          manager={selectedRow as StakeholderManager}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapManagerToDetailItems(selectedRow as StakeholderManager)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_MANAGER"
          title={t('stakeholderManager.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholderManager.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: managerColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ManagerCard onDetail={handleClickDetail} manager={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholdermanager'
          }
        }}
        fetchDataFunction={refetch}
        items={managers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ManagerList;
