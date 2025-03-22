// src/views/project/project-contact-person-list.tsx
'use client';

import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectContactPersonApiService from 'src/services/project/project-contact-person-service';
import stakeholderApiService from 'src/services/stakeholder/stakeholder-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProjectContactPersonCard from './project-contact-person-card';
import ProjectContactPersonDrawer from './project-contact-person-drawer';
import type { ProjectContactPerson } from 'src/types/project/projext-contact-person';
import type { Stakeholder } from 'src/types/stakeholder';
import { contactPersonColumns } from './project-contact-person-row';

interface ProjectContactPersonListProps {
  projectId: string;
}

const ProjectContactPersonList: React.FC<ProjectContactPersonListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectContactPerson | null>(null);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchStakeholders = async () => {
      try {
        const response = await stakeholderApiService.getAll({});
        setStakeholders(response.payload);
      } catch (error) {
        console.error('Error fetching stakeholders:', error);
      }
    };

    fetchStakeholders();
  }, []);

  const fetchContactPersons = (params: GetRequestParam): Promise<IApiResponse<ProjectContactPerson[]>> => {
    return projectContactPersonApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: contactPersons,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectContactPerson[]>({
    queryKey: ['contactPersons'],
    fetchFunction: fetchContactPersons
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectContactPerson);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectContactPerson);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (contactPerson: ProjectContactPerson) => {
    toggleDrawer();
    setSelectedRow(contactPerson);
  };

  const handleDelete = async (contactPersonId: string) => {
    await projectContactPersonApiService.delete(contactPersonId);
    refetch();
  };

  const handleClickDetail = (contactPerson: ProjectContactPerson) => {
    toggleDetailDrawer();
    setSelectedRow(contactPerson);
  };

  const getStakeholderName = (stakeholderId: string) => {
    if (!stakeholders) return 'N/A';
    const stakeholder = stakeholders.find((s) => s.id === stakeholderId);
    return stakeholder ? stakeholder.trade_name : 'N/A';
  };

  const mapContactPersonToDetailItems = (contactPerson: ProjectContactPerson): { title: string; value: string }[] => [
    { title: t('project.project-contact-person.firstName'), value: contactPerson?.first_name || 'N/A' },
    { title: t('project.project-contact-person.middleName'), value: contactPerson?.middle_name || 'N/A' },
    { title: t('project.project-contact-person.lastName'), value: contactPerson?.last_name || 'N/A' },
    { title: t('project.project-contact-person.position'), value: contactPerson?.position || 'N/A' },
    { title: t('project.project-contact-person.department'), value: contactPerson?.department || 'N/A' },
    { title: t('project.project-contact-person.nationalIdNo'), value: contactPerson?.national_id_no || 'N/A' },
    { title: t('project.project-contact-person.gender'), value: contactPerson?.gender || 'N/A' },
    { title: t('project.project-contact-person.phone'), value: contactPerson?.phone || 'N/A' },
    { title: t('project.project-contact-person.email'), value: contactPerson?.email || 'N/A' },
    { title: t('project.project-contact-person.stakeholder'), value: getStakeholderName(contactPerson?.stakeholder_id) },
    {
      title: t('common.table-columns.created-at'),
      value: contactPerson?.created_at ? formatCreatedAt(contactPerson.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ProjectContactPersonDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          contactPerson={selectedRow as ProjectContactPerson}
          refetch={refetch}
          projectId={projectId}
          stakeholders={stakeholders}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapContactPersonToDetailItems(selectedRow as ProjectContactPerson)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="PROJECT_CONTACT_PERSON"
          title={t('project.project-contact-person.details')}
        />
      )}

      <ItemsListing
        title={t('project.project-contact-person.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: contactPersonColumns(handleClickDetail, handleEdit, handleDelete, t, stakeholders)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectContactPersonCard
            onDetail={handleClickDetail}
            contactPerson={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            stakeholders={stakeholders}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectcontactperson'
          }
        }}
        fetchDataFunction={refetch}
        items={contactPersons || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectContactPersonList;
