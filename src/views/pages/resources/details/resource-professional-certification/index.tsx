import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import professionalCertificationApiService from "src/services/resource/professional-certification-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import CertificationCard from "./professional-certification-card";
import CertificationDrawer from "./professional-certification-drawer";
import type { ProfessionalCertification } from "src/types/resource";
import { certificationColumns } from "./professional-certification-row";

interface CertificationListProps {
  model: string;
  professionalId: string;
  typeId: string;
}

const CertificationList: React.FC<CertificationListProps> = ({
  professionalId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<ProfessionalCertification | null>(null);
  const { t } = useTranslation();

  const fetchCertifications = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProfessionalCertification[]>> => {
    return professionalCertificationApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId },
    });
  };

  const {
    data: certifications,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProfessionalCertification[]>({
    queryKey: ["certifications"],
    fetchFunction: fetchCertifications,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalCertification);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalCertification);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (certification: ProfessionalCertification) => {
    toggleDrawer();
    setSelectedRow(certification);
  };

  const handleDelete = async (certificationId: string) => {
    await professionalCertificationApiService.delete(certificationId);
    refetch();
  };

  const handleClickDetail = (certification: ProfessionalCertification) => {
    toggleDetailDrawer();
    setSelectedRow(certification);
  };

  const mapCertificationToDetailItems = (
    certification: ProfessionalCertification,
  ): { title: string; value: string }[] => [
    {
      title: t("resources.professional.certification.certificate-title"),
      value: certification.certificate_title,
    },
    {
      title: t("resources.professional.certification.certification-type"),
      value: certification.certification_type || "N/A",
    },
    {
      title: t("resources.professional.certification.certifying-body"),
      value: certification.certifying_body || "N/A",
    },
    {
      title: t("resources.professional.certification.certification-number"),
      value: certification.certification_number || "N/A",
    },
    {
      title: t("resources.professional.certification.issue-date"),
      value: certification.issue_date || "N/A",
    },
    {
      title: t("resources.professional.certification.expire-date"),
      value: certification.expire_date || "N/A",
    },
    {
      title: t("resources.professional.certification.remark"),
      value: certification.remark || "N/A",
    },
    {
      title: t("common.created-at"),
      value: certification.created_at
        ? formatCreatedAt(certification.created_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <CertificationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          certification={selectedRow as ProfessionalCertification}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapCertificationToDetailItems(
            selectedRow as ProfessionalCertification,
          )}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="PROFESSIONAL_CERTIFICATION"
          title={t("resources.professional.certification.details")}
        />
      )}

      <ItemsListing
        title={t("resources.professional.certification.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: certificationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
          ),
        }}
        isLoading={false}
        ItemViewComponent={({ data }) => (
          <CertificationCard
            onDetail={handleClickDetail}
            certification={data}
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
            subject: "professionalcertification",
          },
        }}
        fetchDataFunction={refetch}
        items={certifications || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default CertificationList;
