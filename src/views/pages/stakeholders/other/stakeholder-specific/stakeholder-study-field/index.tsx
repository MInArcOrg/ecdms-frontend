import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import StakeholderStudyFieldCard from './stakeholder-study-field-card';
import StakeholderStudyFieldDrawer from './stakeholder-study-field-drawer';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { StakeholderStudyField } from 'src/types/stakeholder/other';
import { stakeholderStudyFieldColumns } from './stakeholder-study-field-row';

interface StakeholderStudyFieldListProps {
  model: string;
  typeId: string;
  stakeholderId: string;
}

const StakeholderStudyFieldList: React.FC<StakeholderStudyFieldListProps> = ({ model, stakeholderId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderStudyField | null>(null);
  const { t } = useTranslation();

  const fetchStakeholderStudyFields = (params: GetRequestParam): Promise<IApiResponse<StakeholderStudyField[]>> => {
    return stakeholderOtherApiService<StakeholderStudyField>().getAll(model, {
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
  } = usePaginatedFetch<StakeholderStudyField[]>({
    queryKey: ['stakeholderStudyFields'],
    fetchFunction: fetchStakeholderStudyFields
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (studyField: StakeholderStudyField) => {
    toggleDrawer();
    setSelectedRow(studyField);
  };

  const handleDelete = async (studyFieldId: string) => {
    await stakeholderOtherApiService<StakeholderStudyField>().delete(model, studyFieldId);
    refetch();
  };

  const handleClickDetail = (studyField: StakeholderStudyField) => {
    toggleDetailDrawer();
    setSelectedRow(studyField);
  };

  const mapStakeholderStudyFieldToDetailItems = (studyField: StakeholderStudyField): { title: string; value: string }[] => [
    { title: t('stakeholder.other.stakeholder-study-field.details.title'), value: studyField.studyfield?.title || 'N/A' },
    { title: t('stakeholder.other.stakeholder-study-field.details.description'), value: studyField.studyfield?.description || 'N/A' },
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
        <StakeholderStudyFieldDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          StakeholderStudyField={selectedRow as StakeholderStudyField}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapStakeholderStudyFieldToDetailItems(selectedRow as StakeholderStudyField)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableStakeholderFileTypes.other.stakeholderStudyField}
          title={t('stakeholder.other.stakeholder-study-field.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.other.stakeholder-study-field.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: stakeholderStudyFieldColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderStudyFieldCard
            onDetail={handleClickDetail}
            stakeholderStudyField={data}
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
            subject: 'stakeholderstudyfield'
          }
        }}
        fetchDataFunction={refetch}
        items={studyFields || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderStudyFieldList;
