import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalEducationApiService from 'src/services/resource/professional-education-service';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import EducationCard from './professional-education-card';
import EducationDrawer from './professional-education-drawer';
import type { ProfessionalEducation } from 'src/types/resource';
import type { StudyField } from 'src/types/general/general-master';
import { educationColumns } from './professional-education-row';

interface EducationListProps {
  model: string;
  professionalId: string;
  typeId: string;
}

const EducationList: React.FC<EducationListProps> = ({ professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProfessionalEducation | null>(null);
  const [studyFields, setStudyFields] = useState<StudyField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStudyFields = async () => {
      try {
        const response = await generalMasterDataApiService.getAllResourceGeneralMaster('study-fields', {});
        setStudyFields(
          response.payload.map((item: any) => ({
            id: item.id,
            title: item.title
          })) as StudyField[]
        );
      } catch (error) {
        console.error('Error fetching study fields:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyFields();
  }, []);

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

  const getStudyFieldTitle = (id: string) => {
    if (!studyFields) return 'N/A';
    const field = studyFields.find((f) => f.id === id);
    return field ? field.title : 'N/A';
  };

  const mapEducationToDetailItems = (education: ProfessionalEducation): { title: string; value: string }[] => [
    { title: t('professional.education.study-field'), value: getStudyFieldTitle(education.study_field) },
    { title: t('professional.education.school-name'), value: education?.school_name || 'N/A' },
    { title: t('professional.education.education-level'), value: education?.education_level || 'N/A' },
    { title: t('professional.education.program-type'), value: education?.program_type || 'N/A' },
    { title: t('professional.education.start-date'), value: education?.start_date || 'N/A' },
    { title: t('professional.education.end-date'), value: education?.end_date || 'N/A' },
    { title: t('professional.education.gpa'), value: education?.gpa?.toString() || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: education?.created_at ? formatCreatedAt(education.created_at) : 'N/A'
    }
  ];

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <EducationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          education={selectedRow as ProfessionalEducation}
          refetch={refetch}
          professionalId={professionalId}
          studyFields={studyFields || []}
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
          title={t('professional.education.details')}
        />
      )}

      <ItemsListing
        title={t('professional.education.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: educationColumns(handleClickDetail, handleEdit, handleDelete, t, studyFields)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EducationCard
            onDetail={handleClickDetail}
            education={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            studyFields={studyFields || []}
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

export default EducationList;
