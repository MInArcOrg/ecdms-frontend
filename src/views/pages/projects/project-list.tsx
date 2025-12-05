import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectApiService from 'src/services/project/project-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { Project } from 'src/types/project';
import ItemsListing from 'src/views/shared/listing';
import ProjectCard from './project-card';
import ProjectDrawer from './project-drawer';
import { projectColumns } from './project-row';
import { useQuery } from '@tanstack/react-query';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import ProjectFilterItems from './project-filter';

function ProjectList({
  module = 'project'
}: {
  module?: 'project' | 'infrastructure'
}) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<Project | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchProjects = (params: GetRequestParam): Promise<IApiResponse<Project[]>> => {
    return projectApiService.getAll({
      ...params,
      filter: { ...params.filter, projecttype_id: typeId }
    });
  };
  const { data: type, isLoading: typeIsLoading } = useQuery(
    {
      queryKey: [module + '-project-type', String(typeId)],
      queryFn: () => masterTypeApiService.getOne(module, String(typeId), {}),
      enabled: !!typeId
    }
  )

  const {
    data: projects,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
    handleExport,
    handleFilter
  } = usePaginatedFetch<Project[]>({
    queryKey: ['projects', String(typeId)],
    fetchFunction: fetchProjects,
    exportApiCall(exportParams) {
      return projectApiService.export({ ...exportParams });
    },
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Project);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (project: Project) => {
    toggleDrawer();
    setSelectedRow(project);
  };
  const handleDelete = async (projectId: string) => {
    await projectApiService.delete(projectId);
    refetch();
  };

  return (
    <Box>
      <Card>
        {showDrawer && (
          <ProjectDrawer
            open={showDrawer}
            toggle={toggleDrawer}
            project={selectedRow as Project}
            refetch={refetch}
            type={type?.payload}
            typeId={String(typeId)}
          />
        )}
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}

          ItemViewComponent={({ data }) => (
            <ProjectCard onDetail={() => { }} project={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          title={`${type?.payload?.title} ${t('project.title')}`}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'project'
            }
          }}
          features={
            {
              export: {
                onExport: handleExport,
                enabled: true,
                availableFields: [
                  {
                    label: t('project.form.name'),
                    key: 'name',
                  },
                  {
                    label: t('project.form.type'),
                    key: 'type',
                  },
                  {
                    label: t('project.form.category'),
                    key: 'category',
                  },
                  {
                    label: t('project.form.sub-category'),
                    key: 'sub_category',
                  },
                  {
                    label: t('project.form.end-user'),
                    key: 'end_user',
                  },
                  {
                    label: t('project.form.center'),
                    key: 'center',
                  },
                  {
                    label: t('project.form.grade'),
                    key: 'grade',
                  },
                  {
                    label: t('project.form.function'),
                    key: 'function',
                  },
                  {
                    label: t('project.form.contract-no'),
                    key: 'contract_no',
                  },
                  {
                    label: t('project.form.budget-code'),
                    key: 'budget_code',
                  },
                  {
                    label: t('project.form.procurement-number'),
                    key: 'procurement_no',
                  }
                ],
                permission: {
                  action: "view",
                  subject: "project",
                }
              },
              filter: {
                enabled: true,
                permission: {
                  action: "read",
                  subject: "project",
                },
                onFilter: handleFilter,
                component: ProjectFilterItems
              },

            }
          }
          fetchDataFunction={refetch}
          tableProps={{
            headers: projectColumns(handleEdit, handleDelete, t, refetch, String(typeId))
          }}
          items={projects || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
export default ProjectList;
