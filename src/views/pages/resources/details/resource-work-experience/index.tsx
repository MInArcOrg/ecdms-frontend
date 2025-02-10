import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalWorkExperienceApiService from 'src/services/resource/professional-work-experience-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import WorkExperienceCard from './resource-work-experience-card';
import WorkExperienceDrawer from './resource-work-experience-drawer';
import type { ProfessionalWorkExperience } from 'src/types/resource';
import { experienceColumns } from './resource-work-experience-row';

interface WorkExperienceListProps {
  model: string;
  professionalId: string;
  typeId: string;
}

const WorkExperienceList: React.FC<WorkExperienceListProps> = ({ professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalWorkExperience | null>(null);
  const { t } = useTranslation();

  const fetchWorkExperiences = (params: GetRequestParam): Promise<IApiResponse<ProfessionalWorkExperience[]>> => {
    return professionalWorkExperienceApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: experiences,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalWorkExperience[]>({
    queryKey: ['work-experiences'],
    fetchFunction: fetchWorkExperiences
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalWorkExperience);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalWorkExperience);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (experience: ProfessionalWorkExperience) => {
    toggleDrawer();
    setSelectedRow(experience);
  };

  const handleDelete = async (experienceId: string) => {
    await professionalWorkExperienceApiService.delete(experienceId);
    refetch();
  };

  const handleClickDetail = (experience: ProfessionalWorkExperience) => {
    toggleDetailDrawer();
    setSelectedRow(experience);
  };

  const mapExperienceToDetailItems = (experience: ProfessionalWorkExperience): { title: string; value: string }[] => [
    { title: t('resources.professional.work-experience.company-name'), value: experience.company_name },
    { title: t('resources.professional.work-experience.position'), value: experience.position || 'N/A' },
    { title: t('resources.professional.work-experience.department'), value: experience.department || 'N/A' },
    { title: t('resources.professional.work-experience.task-description'), value: experience.task_description || 'N/A' },
    { title: t('resources.professional.work-experience.start-date'), value: experience.start_date || 'N/A' },
    { title: t('resources.professional.work-experience.end-date'), value: experience.end_date || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: experience.created_at ? formatCreatedAt(experience.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <WorkExperienceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          experience={selectedRow as ProfessionalWorkExperience}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapExperienceToDetailItems(selectedRow as ProfessionalWorkExperience)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="PROFESSIONAL_WORK_EXPERIENCE"
          title={t('resources.professional.work-experience.details')}
        />
      )}

      <ItemsListing
        title={t('resources.professional.work-experience.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: experienceColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={false}
        ItemViewComponent={({ data }) => (
          <WorkExperienceCard
            onDetail={handleClickDetail}
            experience={data}
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
            subject: 'professionalworkexperience'
          }
        }}
        fetchDataFunction={refetch}
        items={experiences || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default WorkExperienceList;
