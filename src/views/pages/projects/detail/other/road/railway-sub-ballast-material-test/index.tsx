"use client";

import type React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";

// Assuming RailwaySubBallastMaterialTest is defined and imported correctly
// For example: import { RailwaySubBallastMaterialTest } from 'src/types/project/other-tests';
// Or defined as in the previous step:
interface RailwaySubBallastMaterialTest {
  id: string;
  project_id: string;
  railway_line_section_name: string;
  sub_ballast_material_type_id: string;
  testing_method_used?: string;
  sampling_method?: string;
  sample_size?: number;
  material_source?: string;
  sieve_analysis_results?: string;
  supplier?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

import RailwaySubBallastMaterialTestCard from "./railway-sub-ballast-material-test-card"; // Renamed import
import RailwaySubBallastMaterialTestDrawer from "./railway-sub-ballast-material-test-drawer"; // Renamed import
import { railwaySubBallastMaterialTestColumns } from "./railway-sub-ballast-material-test-row"; // Renamed import

import { formatCreatedAt } from "src/utils/formatter/date";

interface RailwaySubBallastMaterialTestListProps {
  // Renamed interface if component file is also renamed
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastMaterialTestList: React.FC<
  RailwaySubBallastMaterialTestListProps
> = ({
  // Renamed component
  otherSubMenu,
  projectId,
  // typeId // This prop is unused in the core logic shown
}) => {
  const [showCreateEditDrawer, setShowCreateEditDrawer] = useState(false); // Renamed state for clarity
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [
    selectedRailwaySubBallastMaterialTest,
    setSelectedRailwaySubBallastMaterialTest,
  ] = useState<RailwaySubBallastMaterialTest | null>(null); // Renamed state
  const { t } = useTranslation();

  const fetchData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySubBallastMaterialTest[]>> => {
    return projectOtherApiSecondService<RailwaySubBallastMaterialTest>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySubBallastMaterialTestData, // Renamed data variable
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySubBallastMaterialTest[]>({
    queryKey: ["railwaySubBallastMaterialTests", projectId], // Query key reflects list of tests
    fetchFunction: fetchData,
  });

  const toggleCreateEditDrawer = () => {
    // Renamed function
    setSelectedRailwaySubBallastMaterialTest(
      {} as RailwaySubBallastMaterialTest,
    ); // Use new state setter
    setShowCreateEditDrawer(!showCreateEditDrawer); // Use new state
  };

  const toggleDetailDrawer = () => {
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (testData: RailwaySubBallastMaterialTest) => {
    // Renamed parameter
    setSelectedRailwaySubBallastMaterialTest(testData); // Use new state setter
    setShowCreateEditDrawer(true); // Use new state
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastMaterialTest>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (testData: RailwaySubBallastMaterialTest) => {
    // Renamed parameter
    setSelectedRailwaySubBallastMaterialTest(testData); // Use new state setter
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (
    testData: RailwaySubBallastMaterialTest,
  ): { title: string; value: string }[] => [
    // Renamed parameter
    {
      title: t("common.table-columns.id"),
      value: testData?.id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.project-id",
        "Project ID",
      ), // Updated locale key
      value: testData?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.railway-line-section-name",
        "Railway Line Section Name",
      ), // Updated locale key
      value: testData?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.sub-ballast-material-type-id",
        "Sub Ballast Material Type ID",
      ), // Updated locale key
      value: testData?.sub_ballast_material_type_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.testing-method-used",
        "Testing Method Used",
      ), // Updated locale key
      value: testData?.testing_method_used || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.sampling-method",
        "Sampling Method",
      ), // Updated locale key
      value: testData?.sampling_method || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.sample-size",
        "Sample Size",
      ), // Updated locale key
      value: testData?.sample_size?.toLocaleString() ?? "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.material-source",
        "Material Source",
      ), // Updated locale key
      value: testData?.material_source || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.sieve-analysis-results",
        "Sieve Analysis Results",
      ), // Updated locale key
      value: testData?.sieve_analysis_results || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.supplier",
        "Supplier",
      ), // Updated locale key
      value: testData?.supplier || "N/A",
    },
    {
      title: t(
        "project.other.railway-sub-ballast-material-test.details.remark",
        "Remark",
      ), // Updated locale key
      value: testData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: testData?.created_at
        ? formatCreatedAt(testData.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: testData?.updated_at
        ? formatCreatedAt(testData.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showCreateEditDrawer && selectedRailwaySubBallastMaterialTest && (
        <RailwaySubBallastMaterialTestDrawer
          otherSubMenu={otherSubMenu}
          open={showCreateEditDrawer}
          toggle={toggleCreateEditDrawer}
          railwaySubBallastMaterialTest={selectedRailwaySubBallastMaterialTest}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && selectedRailwaySubBallastMaterialTest && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRailwaySubBallastMaterialTest)}
          hasReference={false}
          id={selectedRailwaySubBallastMaterialTest?.id || ""}
          fileType=""
          // Updated locale key and default text
          title={t(
            "project.other.railway-sub-ballast-material-test.detail",
            "Railway Sub Ballast Material Test Details",
          )}
        />
      )}

      <ItemsListing
        // Updated locale key and default text
        title={t(
          "project.other.railway-sub-ballast-material-test.title",
          "Railway Sub Ballast Material Tests",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          // NOTE: railwaySubBallastMaterialTestColumns must be updated to work with RailwaySubBallastMaterialTest
          // and its name changed if a global rename is applied
          headers: railwaySubBallastMaterialTestColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ), // Renamed import
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data: itemData }) => (
          // Renamed component, ensure it's imported correctly
          // NOTE: RailwaySubBallastMaterialTestCard must be updated to expect this prop name
          <RailwaySubBallastMaterialTestCard
            onDetail={handleClickDetail}
            // Prop name changed to reflect the model specifically
            railwaySubBallastMaterialTest={
              itemData as RailwaySubBallastMaterialTest
            }
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleCreateEditDrawer, // Use renamed function
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "railwaysubballastmaterialtest", // Subject reflects the model
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySubBallastMaterialTestData || []} // Use renamed data variable
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

// Consider renaming the component export if the file is also renamed
export default RailwaySubBallastMaterialTestList;
