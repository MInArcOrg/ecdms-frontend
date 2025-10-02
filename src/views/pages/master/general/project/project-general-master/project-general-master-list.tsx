// components/ProjectGeneralMaster.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import { ProjectMasterModel } from "src/constants/master-data/project-general-master-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import { ProjectGeneralMaster } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import ProjectGeneralMasterCard from "./project-general-master-card";
import ProjectGeneralMasterDrawer from "./project-general-master-drawer";

interface ProjectGeneralMasterProps {
  projectMasterModel: ProjectMasterModel;
}

const ProjectGeneralMasterList: React.FC<ProjectGeneralMasterProps> = ({
  projectMasterModel,
}) => {
  const [selectedRow, setSelectedRow] = useState<ProjectGeneralMaster | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchProjectGeneralMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectGeneralMaster[]>> => {
    return projectGeneralMasterDataApiService.getAll({
      ...params,
      filter: { ...params.filter, model: projectMasterModel.model },
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: projectGeneralMasters,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProjectGeneralMaster[]>({
    queryKey: ["general-master", projectMasterModel.title],
    fetchFunction: fetchProjectGeneralMaster,
  });
  const handleDelete = async (projectGeneralMasterSubCategoryId: string) => {
    await projectGeneralMasterDataApiService.delete(
      projectGeneralMasterSubCategoryId,
    );
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectGeneralMaster);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (ProjectGeneralMaster: ProjectGeneralMaster) => {
    toggleDrawer();
    setSelectedRow(ProjectGeneralMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <ProjectGeneralMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as ProjectGeneralMaster}
          refetch={refetch}
          projectMasterModel={projectMasterModel}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.${projectMasterModel.title}`)}
            ItemViewComponent={({ data }) => (
              <ProjectGeneralMasterCard
                projectMasterModel={projectMasterModel}
                projectGeneralMaster={data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                t={t}
                refetch={refetch}
              />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: false,
              permission: {
                action: "create",
                subject: projectMasterModel.dbModel,
              },
            }}
            fetchDataFunction={refetch}
            items={projectGeneralMasters || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ProjectGeneralMasterList;
