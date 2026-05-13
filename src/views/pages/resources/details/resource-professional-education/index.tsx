import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalEducationApiService from 'src/services/resource/professional-education-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import EducationCard from './professional-education-card';
import EducationDrawer from './professional-education-drawer';
import type { ProfessionalEducation } from 'src/types/resource';
import { educationColumns } from './professional-education-row';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface ResourceEducationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  professionalId: string;
}

const ResourceEducationList: React.FC<ResourceEducationListProps> = ({ professionalId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalEducation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchEducation = (params: GetRequestParam): Promise<IApiResponse<ProfessionalEducation[]>> => {
    return professionalEducationApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId }
    });
  };

  const {
    data: educations,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProfessionalEducation[]>({
    queryKey: ['educations'],
    fetchFunction: fetchEducation
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalEducation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalEducation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (education: ProfessionalEducation) => {
    toggleDrawer();
    setSelectedRow(education);
  };

  const handleDelete = async (educationId: string) => {
    await professionalEducationApiService.delete(educationId);
    refetch();
  };

  const handleClickDetail = (education: ProfessionalEducation) => {
    toggleDetailDrawer();
    setSelectedRow(education);
  };

  const getStudyFieldTitle = (education: ProfessionalEducation) => {
    return education.studyfield ? education.studyfield.title : education.study_field || 'N/A';
  };

  const mapEducationToDetailItems = (education: ProfessionalEducation): { title: string; value: string }[] => [
    {
      title: t('resources.professional.education.study-field'),
      value: getStudyFieldTitle(education)
    },
    {
      title: t('resources.professional.education.school-name'),
      value: education?.school_name || 'N/A'
    },
    {
      title: t('resources.professional.education.education-level'),
      value: education?.education_level || 'N/A'
    },
    {
      title: t('resources.professional.education.program-type'),
      value: education?.program_type || 'N/A'
    },
    {
      title: t('resources.professional.education.start-date'),
      value: education?.start_date || 'N/A'
    },
    {
      title: t('resources.professional.education.end-date'),
      value: education?.end_date || 'N/A'
    },
    {
      title: t('resources.professional.education.gpa'),
      value: education?.gpa?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: education?.created_at ? formatCreatedAt(education.created_at) : 'N/A'
    }
  ];



  return (
    <Box>
      {showDrawer && (
        <EducationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          education={selectedRow as ProfessionalEducation}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapEducationToDetailItems(selectedRow as ProfessionalEducation)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="PROFESSIONAL_EDUCATION"
          title={t('resources.professional.education.details')}
        />
      )}

      <ItemsListing
        title={t('resources.professional.education.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: educationColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EducationCard
            onDetail={handleClickDetail}
            education={data}
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
            subject: 'professionaleducation'
          }
        }}
        fetchDataFunction={refetch}
        items={educations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ResourceEducationList;
