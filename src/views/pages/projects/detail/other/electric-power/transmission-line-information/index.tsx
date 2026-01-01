import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { TransmissionLineInformation } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TransmissionLineInformationCard from './transmission-line-information-card';
import TransmissionLineInformationDrawer from './transmission-line-information-drawer';
import { transmissionLineInformationColumns } from './transmission-line-information-row';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface TransmissionLineInformationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TransmissionLineInformationList: React.FC<TransmissionLineInformationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransmissionLineInformation | null>(null);
  const { t } = useTranslation();

  const fetchTransmissionLineInformations = (params: GetRequestParam): Promise<IApiResponse<TransmissionLineInformation[]>> => {
    return projectOtherApiSecondService<TransmissionLineInformation>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter }
    });
  };

  const {
    data: transmissionLineInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TransmissionLineInformation[]>({
    queryKey: ['transmissionLineInformations'],
    fetchFunction: fetchTransmissionLineInformations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TransmissionLineInformation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TransmissionLineInformation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transmissionLineInformation: TransmissionLineInformation) => {
    toggleDrawer();
    setSelectedRow(transmissionLineInformation);
  };

  const handleDelete = async (transmissionLineInformationId: string) => {
    await projectOtherApiSecondService<TransmissionLineInformation>().delete(otherSubMenu?.apiRoute || '', transmissionLineInformationId);
    refetch();
  };

  const handleClickDetail = (transmissionLineInformation: TransmissionLineInformation) => {
    toggleDetailDrawer();
    setSelectedRow(transmissionLineInformation);
  };

  const mapTransmissionLineInformationToDetailItems = (
    transmissionLineInformation: TransmissionLineInformation
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.transmission-line-information.details.name'),
        value: transmissionLineInformation?.name || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.transmission-voltage'),
        value: transmissionLineInformation?.transmission_voltage?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.transmission-line-route-length'),
        value: transmissionLineInformation?.transmission_line_route_length?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.circuit-number'),
        value: transmissionLineInformation?.circuit_number?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.starting-point-northing'),
        value: transmissionLineInformation?.starting_point_northing?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.starting-point-easting'),
        value: transmissionLineInformation?.starting_point_easting?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.ending-point-northing'),
        value: transmissionLineInformation?.ending_point_northing?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.ending-point-easting'),
        value: transmissionLineInformation?.ending_point_easting?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.lifetime'),
        value: transmissionLineInformation?.lifetime?.toString() || 'N/A'
      },
      {
        title: t('project.other.transmission-line-information.details.remark'),
        value: transmissionLineInformation?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: transmissionLineInformation?.created_at ? formatCreatedAt(transmissionLineInformation.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: transmissionLineInformation?.updated_at ? formatCreatedAt(transmissionLineInformation.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <TransmissionLineInformationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          transmissionLineInformation={selectedRow as TransmissionLineInformation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransmissionLineInformationToDetailItems(selectedRow as TransmissionLineInformation)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transmissionLineInformation}
          title={t('project.other.transmission-line-information.transmission-line-information-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transmission-line-information.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transmissionLineInformationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransmissionLineInformationCard
            onDetail={handleClickDetail}
            transmissionLineInformation={data}
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
            subject: otherSubMenu?.model || ''
          }
        }}
        fetchDataFunction={refetch}
        items={transmissionLineInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransmissionLineInformationList;
