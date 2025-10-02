"use client";

import type React from "react";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { RegulationAndPolicy } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import RegulationAndPolicyCard from "./regulation-and-policy-card";
import RegulationAndPolicyDrawer from "./regulation-and-policy-drawer";
import { regulationAndPolicyColumns } from "./regulation-and-policy-row";

interface RegulationAndPolicyListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RegulationAndPolicyList: React.FC<RegulationAndPolicyListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RegulationAndPolicy | null>(
    null,
  );
  const { t } = useTranslation();

  const fetchRegulationAndPolicies = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RegulationAndPolicy[]>> => {
    return projectOtherApiSecondService<RegulationAndPolicy>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: regulationAndPolicies,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RegulationAndPolicy[]>({
    queryKey: ["regulationAndPolicies"],
    fetchFunction: fetchRegulationAndPolicies,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RegulationAndPolicy);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RegulationAndPolicy);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (regulationAndPolicy: RegulationAndPolicy) => {
    toggleDrawer();
    setSelectedRow(regulationAndPolicy);
  };

  const handleDelete = async (regulationAndPolicyId: string) => {
    await projectOtherApiSecondService<RegulationAndPolicy>().delete(
      otherSubMenu?.apiRoute || "",
      regulationAndPolicyId,
    );
    refetch();
  };

  const handleClickDetail = (regulationAndPolicy: RegulationAndPolicy) => {
    toggleDetailDrawer();
    setSelectedRow(regulationAndPolicy);
  };

  const mapRegulationAndPolicyToDetailItems = (
    regulationAndPolicy: RegulationAndPolicy,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.regulation-and-policy.details.regulatory-body-overseeing-the-facility",
      ),
      value:
        regulationAndPolicy?.regulatory_body_overseeing_the_facility || "N/A",
    },
    {
      title: t(
        "project.other.regulation-and-policy.details.regulatory-compliance-monitoring",
      ),
      value: regulationAndPolicy?.regulatory_compliance_monitoring
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t(
        "project.other.regulation-and-policy.details.environmental-and-social-regulation-compliance-monitoring",
      ),
      value:
        regulationAndPolicy?.environmental_and_social_regulation_compliance_monitoring
          ? t("common.yes")
          : t("common.no"),
    },
    {
      title: t(
        "project.other.regulation-and-policy.details.licensing-and-permit-requirements",
      ),
      value: regulationAndPolicy?.licensing_and_permit_requirements
        ? t("common.yes")
        : t("common.no"),
    },
    {
      title: t("project.other.regulation-and-policy.details.remark"),
      value: regulationAndPolicy?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: regulationAndPolicy?.created_at
        ? formatCreatedAt(regulationAndPolicy.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: regulationAndPolicy?.updated_at
        ? formatCreatedAt(regulationAndPolicy.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RegulationAndPolicyDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          regulationAndPolicy={selectedRow as RegulationAndPolicy}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRegulationAndPolicyToDetailItems(
            selectedRow as RegulationAndPolicy,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.regulationAndPolicy}
          title={t(
            "project.other.regulation-and-policy.regulation-and-policy-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.regulation-and-policy.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: regulationAndPolicyColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RegulationAndPolicyCard
            onDetail={handleClickDetail}
            regulationAndPolicy={data}
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
            action: "create",
            subject: "regulationandpolicy",
          },
        }}
        fetchDataFunction={refetch}
        items={regulationAndPolicies || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RegulationAndPolicyList;
