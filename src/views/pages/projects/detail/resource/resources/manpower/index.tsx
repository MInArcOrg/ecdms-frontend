import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalApiService from 'src/services/resource/professional-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { Professional } from 'src/types/resource';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ManpowerDrawer from './manpower-drawer';
import { manpowerColumns } from './manpower-row';

const ManpowerList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Professional | null>(null);

  const fetchManpower = (params: GetRequestParam): Promise<IApiResponse<Professional[]>> => {
    return professionalApiService.getAll({
      ...params,
      filter: {
        parent: projectId
      }
    });
  };

  const {
    data: manpower,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Professional[]>({
    queryKey: ['manpower'],
    fetchFunction: fetchManpower
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setShowDrawer(true);
  };

  const handleEdit = (item: Professional) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleClickDetail = (item: Professional) => {
    setSelectedRow(item);
    setShowDetailDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await professionalApiService.delete(id);
    refetch();
  };

  const getFullName = (item: Professional) =>
    item.full_name || `${item.first_name || ''} ${item.middle_name || ''} ${item.last_name || ''}`.trim() || 'N/A';

  const mapManpowerToDetailItems = (item: Professional): { title: string; value: string }[] => [
    { title: t('resources.professional.fullName'), value: getFullName(item) },
    { title: t('resources.professional.nationalIdNo'), value: item?.national_id_no || 'N/A' },
    {
      title: t('resources.professional.dateOfBirth'),
      value: item?.date_of_birth ? formatDynamicDate(item.date_of_birth) : 'N/A'
    },
    { title: t('resources.professional.gender'), value: item?.gender || 'N/A' },
    { title: t('resources.professional.phoneNo'), value: item?.phone_no || 'N/A' },
    { title: t('resources.professional.email'), value: item?.email || 'N/A' },
    { title: t('resource.columns.remark'), value: item?.remark || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: item?.created_at ? formatCreatedAt(item.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && <ManpowerDrawer projectId={projectId} open={showDrawer} toggle={toggleDrawer} refetch={refetch} manpower={selectedRow} />}

      {showDetailDrawer && selectedRow && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapManpowerToDetailItems(selectedRow)}
          id={selectedRow.id || ''}
          hasReference={false}
          fileType="project-manpower"
          title={t('project.navigation.submenu.resource.resources.manpower')}
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.manpower')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: manpowerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectmanpower'
          }
        }}
        fetchDataFunction={refetch}
        items={manpower || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ManpowerList;
