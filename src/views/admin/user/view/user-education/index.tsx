import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import userEducationApiService from 'src/services/admin/user-education-service';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { UserEducation } from 'src/types/admin/user';
import type { StudyField } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import EducationCard from './user-education-card';
import EducationDrawer from './user-education-drawer';
import { educationColumns } from './user-education-row';

interface UserEducationListProps {
  userId: string;
}

const UserEducationList: React.FC<UserEducationListProps> = ({ userId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserEducation | null>(null);
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

  const fetchEducation = (params: GetRequestParam): Promise<IApiResponse<UserEducation[]>> => {
    return userEducationApiService.getAll({
      ...params,
      filter: { ...params.filter, user_id: userId }
    });
  };

  const {
    data: educations,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<UserEducation[]>({
    queryKey: ['educations'],
    fetchFunction: fetchEducation
  });

  const toggleDrawer = () => {
    setSelectedRow({} as UserEducation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as UserEducation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (education: UserEducation) => {
    toggleDrawer();
    setSelectedRow(education);
  };

  const handleDelete = async (educationId: string) => {
    await userEducationApiService.delete(educationId);
    refetch();
  };

  const handleClickDetail = (education: UserEducation) => {
    toggleDetailDrawer();
    setSelectedRow(education);
  };





  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <EducationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          education={selectedRow as UserEducation}
          refetch={refetch}
          userId={userId}
          studyFields={studyFields || []}
        />
      )}


      <ItemsListing
        title={t('department.user.education.title')}
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
            subject: 'usereducation'
          }
        }}
        fetchDataFunction={refetch}
        items={educations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default UserEducationList;
