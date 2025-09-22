import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import { DrainageAssessment } from "src/types/project/other";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import DrainageAssessmentCard from "./drainage-assessment-card";
import DrainageAssessmentDrawer from "./drainage-assessment-drawer";
import { drainageAssessmentColumns } from "./drainage-assessment-row";

interface DrainageAssessmentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const DrainageAssessmentList: React.FC<DrainageAssessmentListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DrainageAssessment | null>(
    null,
  );
  const { t } = useTranslation();

  const fetchDrainageAssessments = (
    params: GetRequestParam,
  ): Promise<IApiResponse<DrainageAssessment[]>> => {
    return projectOtherApiSecondService<DrainageAssessment>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: drainageAssessments,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DrainageAssessment[]>({
    queryKey: ["drainageAssessments"],
    fetchFunction: fetchDrainageAssessments,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DrainageAssessment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as DrainageAssessment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (drainageAssessment: DrainageAssessment) => {
    toggleDrawer();
    setSelectedRow(drainageAssessment);
  };

  const handleDelete = async (drainageAssessmentId: string) => {
    await projectOtherApiSecondService<DrainageAssessment>().delete(
      otherSubMenu?.apiRoute || "",
      drainageAssessmentId,
    );
    refetch();
  };

  const handleClickDetail = (drainageAssessment: DrainageAssessment) => {
    toggleDetailDrawer();
    setSelectedRow(drainageAssessment);
  };

  const mapDrainageAssessmentToDetailItems = (
    drainageAssessment: DrainageAssessment,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.drainage-assessment.details.road-segment"),
      value: drainageAssessment?.road_segment || "N/A",
    },
    {
      title: t("project.other.drainage-assessment.details.drainage-type"),
      value: drainageAssessment?.drainage_type_id || "N/A",
    },
    {
      title: t("project.other.drainage-assessment.details.drainage-condition"),
      value: drainageAssessment?.drainage_condition_id || "N/A",
    },
    {
      title: t("project.other.drainage-assessment.details.remark"),
      value: drainageAssessment?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: drainageAssessment?.created_at
        ? formatCreatedAt(drainageAssessment.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: drainageAssessment?.updated_at
        ? formatCreatedAt(drainageAssessment.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <DrainageAssessmentDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          drainageAssessment={selectedRow as DrainageAssessment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapDrainageAssessmentToDetailItems(
            selectedRow as DrainageAssessment,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.drainageAssessment}
          title={t(
            "project.other.drainage-assessment.drainage-assessment-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.drainage-assessment.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: drainageAssessmentColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <DrainageAssessmentCard
            onDetail={handleClickDetail}
            drainageAssessment={data}
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
            action: "create",
            subject: "drainageassessment",
          },
        }}
        fetchDataFunction={refetch}
        items={drainageAssessments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default DrainageAssessmentList;
