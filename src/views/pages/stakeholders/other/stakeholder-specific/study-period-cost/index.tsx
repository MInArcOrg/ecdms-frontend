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
import StudyPeriodCostCard from './study-period-cost-card';
import StudyPeriodCostDrawer from './study-period-cost-drawer';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { StudyPeriodCost } from 'src/types/stakeholder/other';
import { studyPeriodCostColumns } from './study-period-cost-row';

interface StudyPeriodCostListProps {
  model: string;
  typeId: string;
  stakeholderId: string;
}

const StudyPeriodCostList: React.FC<StudyPeriodCostListProps> = ({ model, stakeholderId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StudyPeriodCost | null>(null);
  const { t } = useTranslation();

  const fetchStudyPeriodCosts = (params: GetRequestParam): Promise<IApiResponse<StudyPeriodCost[]>> => {
    return stakeholderOtherApiService<StudyPeriodCost>().getAll(model, {
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: studyPeriodCosts,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StudyPeriodCost[]>({
    queryKey: ['studyPeriodCosts'],
    fetchFunction: fetchStudyPeriodCosts
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (studyPeriodCost: StudyPeriodCost) => {
    toggleDrawer();
    setSelectedRow(studyPeriodCost);
  };

  const handleDelete = async (studyPeriodCostId: string) => {
    await stakeholderOtherApiService<StudyPeriodCost>().delete(model, studyPeriodCostId);
    refetch();
  };

  const handleClickDetail = (studyPeriodCost: StudyPeriodCost) => {
    toggleDetailDrawer();
    setSelectedRow(studyPeriodCost);
  };

  const mapStudyPeriodCostToDetailItems = (studyPeriodCost: StudyPeriodCost): { title: string; value: string }[] => [
    {
      title: t('stakeholder.other.study-period-cost.details.study-field'),
      value: studyPeriodCost?.stakeholderstudyfield?.studyfield?.title || 'N/A'
    },
    { title: t('stakeholder.other.study-period-cost.details.description'), value: studyPeriodCost.description || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: studyPeriodCost.created_at ? formatCreatedAt(studyPeriodCost.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: studyPeriodCost.updated_at ? formatCreatedAt(studyPeriodCost.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <StudyPeriodCostDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          studyPeriodCost={selectedRow as StudyPeriodCost}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapStudyPeriodCostToDetailItems(selectedRow as StudyPeriodCost)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableStakeholderFileTypes.other.studyPeriodCost}
          title={t('stakeholder.other.study-period-cost.study-period-cost-details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.other.study-period-cost.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: studyPeriodCostColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StudyPeriodCostCard
            onDetail={handleClickDetail}
            studyPeriodCost={data}
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
            subject: 'studyperiodcost'
          }
        }}
        fetchDataFunction={refetch}
        items={studyPeriodCosts || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StudyPeriodCostList;
