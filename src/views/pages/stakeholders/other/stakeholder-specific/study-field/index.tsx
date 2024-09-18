import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import otherApiService from 'src/services/stakeholder/other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StudyField } from 'src/types/stakeholder/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import StudyFieldCard from './study-field-card';
import StudyFieldDrawer from './study-field';
import { studyFieldColumns } from './study-field-row';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';

interface StudyFieldListProps {
  model: string;
  typeId: string;
  stakeholderId: string;
}

const StudyFieldList: React.FC<StudyFieldListProps> = ({ model, stakeholderId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StudyField | null>(null);
  const { t } = useTranslation();

  const fetchStudyFields = (params: GetRequestParam): Promise<IApiResponse<StudyField[]>> => {
    return otherApiService<StudyField>().getAll(model, {
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: studyFields,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StudyField[]>({
    queryKey: ['studyFields'],
    fetchFunction: fetchStudyFields
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (studyField: StudyField) => {
    toggleDrawer();
    setSelectedRow(studyField);
  };

  const handleDelete = async (materialId: string) => {
    await otherApiService<StudyField>().delete(model, materialId);
    refetch();
  };

  const handleClickDetail = (studyField: StudyField) => {
    toggleDetailDrawer();
    setSelectedRow(studyField);
  };

  const mapStudyFieldToDetailItems = (
    studyField: StudyField
  ): { title: string; value: string }[] => [
    { title: t('stakeholder.other.building-envelop-material.details.exterior-walls'), value: studyField.exterior_walls || 'N/A' },
    { title: t('stakeholder.other.building-envelop-material.details.roof-assembly'), value: studyField.roof_assembly || 'N/A' },
    {
      title: t('stakeholder.other.building-envelop-material.details.exterior-windows'),
      value: studyField.exterior_windows || 'N/A'
    },
    { title: t('stakeholder.other.building-envelop-material.details.exterior-doors'), value: studyField.exterior_doors || 'N/A' },
    {
      title: t('stakeholder.other.building-envelop-material.details.shading-components'),
      value: studyField.shading_components || 'N/A'
    },
    { title: t('stakeholder.other.building-envelop-material.details.remark'), value: studyField.remark || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: studyField.created_at ? formatCreatedAt(studyField.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: studyField.updated_at ? formatCreatedAt(studyField.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <StudyFieldDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          studyField={selectedRow as StudyField}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapStudyFieldToDetailItems(selectedRow as StudyField)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.studyField}
          title={t('stakeholder.other.building-envelop-material.building-envelop-material-details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.other.building-envelop-material.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: studyFieldColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StudyFieldCard
            onDetail={handleClickDetail}
            studyField={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'studyField'
          }
        }}
        fetchDataFunction={refetch}
        items={studyFields || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StudyFieldList;
