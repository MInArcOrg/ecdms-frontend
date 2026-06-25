import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import departmentApiService from 'src/services/department/department-service';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { MachineryInformation } from 'src/types/resource';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import MachineryInformationDrawer from './machinery-information-drawer';
import { machineryInformationColumns } from './machinery-information-row';

const MachineryInformationList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MachineryInformation | null>(null);

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentApiService.getAll(dropDownConfig({ pagination: { page: 1, pageSize: 100000 } }))
  });

  const fetchMachineryInformations = (params: GetRequestParam): Promise<IApiResponse<MachineryInformation[]>> => {
    return machineryInformationApiService.getAll({
      ...params,
      filter: { ...params.filter, parent: projectId }
    });
  };

  const {
    data: machineryInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MachineryInformation[]>({
    queryKey: ['machinery-informations', projectId],
    fetchFunction: fetchMachineryInformations
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

  const handleEdit = (item: MachineryInformation) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleClickDetail = (item: MachineryInformation) => {
    setSelectedRow(item);
    setShowDetailDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await machineryInformationApiService.delete(id);
    refetch();
  };

  const getDepartmentName = (departmentId?: string) => {
    if (!departmentId) return 'N/A';

    return departments?.payload?.find((department) => department.id === departmentId)?.name || 'N/A';
  };

  const mapMachineryToDetailItems = (item: MachineryInformation): { title: string; value: string }[] => [
    { title: t('department.user.form.department'), value: getDepartmentName(item?.department_id) },
    { title: t('Type'), value: item?.type || 'N/A' },
    { title: t('Plate No'), value: item?.plate_no || 'N/A' },
    { title: t('Owner Name'), value: item?.owner_name || 'N/A' },
    { title: t('Engine No'), value: item?.engine_no || 'N/A' },
    { title: t('Serial No'), value: item?.serial_no || 'N/A' },
    { title: t('Title Certificate No'), value: item?.title_certificate_no || 'N/A' },
    { title: t('Registration Date'), value: item?.registration_date ? formatDynamicDate(item.registration_date) : 'N/A' },
    { title: t('Make'), value: item?.make || 'N/A' },
    { title: t('Model'), value: item?.model || 'N/A' },
    { title: t('Capacity'), value: item?.capacity?.toString() || 'N/A' },
    { title: t('Engine Power (HP)'), value: item?.engine_power_hp?.toString() || 'N/A' },
    { title: t('Manufacture Year'), value: item?.manufacture_year?.toString() || 'N/A' },
    { title: t('Tel'), value: item?.tell || 'N/A' },
    { title: t('TS No'), value: item?.ts_no || 'N/A' },
    { title: t('Date'), value: item?.date ? formatDynamicDate(item.date) : 'N/A' },
    { title: t('Duty'), value: item?.duty || 'N/A' },
    { title: t('Data'), value: item?.data || 'N/A' },
    { title: t('Remark'), value: item?.remark || 'N/A' },
    { title: t('Edesate'), value: item?.edesate || 'N/A' },
    { title: t('Eged'), value: item?.eged || 'N/A' },
    { title: t('Eged Date'), value: item?.eged_d ? formatDynamicDate(item.eged_d) : 'N/A' },
    { title: t('Eged No'), value: item?.eged_n || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: item?.created_at ? formatCreatedAt(item.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MachineryInformationDrawer
          projectId={projectId}
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          machineryInformation={selectedRow}
        />
      )}

      {showDetailDrawer && selectedRow && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMachineryToDetailItems(selectedRow)}
          id={selectedRow.id || ''}
          hasReference={false}
          fileType="project-machinery"
          title={t('project.navigation.submenu.resource.resources.machinery')}
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.machinery')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: machineryInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectmachinery'
          }
        }}
        fetchDataFunction={refetch}
        items={machineryInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MachineryInformationList;
