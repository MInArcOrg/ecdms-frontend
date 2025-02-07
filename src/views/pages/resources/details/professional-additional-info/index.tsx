import { Box } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import professionalAdditionalInfoApiService from "src/services/resource/professional-additional-info-service"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import { formatCreatedAt } from "src/utils/formatter/date"
import ItemsListing from "src/views/shared/listing"
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer"
import AdditionalInfoCard from "./professional-additional-info-card"
import AdditionalInfoDrawer from "./professional-additional-info-drawer"
import type { ProfessionalAdditionalInfo } from "src/types/resource"
import { additionalInfoColumns } from "./professional-additional-info-row"

interface AdditionalInfoListProps {
  model: string
  professionalId: string
  typeId: string
}

const AdditionalInfoList: React.FC<AdditionalInfoListProps> = ({ professionalId }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showDetailDrawer, setShowDetailDrawer] = useState(false)
  const [selectedRow, setSelectedRow] = useState<ProfessionalAdditionalInfo | null>(null)
  const { t } = useTranslation()

  const fetchAdditionalInfo = (params: GetRequestParam): Promise<IApiResponse<ProfessionalAdditionalInfo[]>> => {
    return professionalAdditionalInfoApiService.getAll({
      ...params,
      filter: { ...params.filter, professional_id: professionalId },
    })
  }

  const {
    data: additionalInfos,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProfessionalAdditionalInfo[]>({
    queryKey: ["additionalInfos"],
    fetchFunction: fetchAdditionalInfo,
  })

  const toggleDrawer = () => {
    setSelectedRow({} as ProfessionalAdditionalInfo)
    setShowDrawer(!showDrawer)
  }

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProfessionalAdditionalInfo)
    setShowDetailDrawer(!showDetailDrawer)
  }

  const handleEdit = (additionalInfo: ProfessionalAdditionalInfo) => {
    toggleDrawer()
    setSelectedRow(additionalInfo)
  }

  const handleDelete = async (additionalInfoId: string) => {
    await professionalAdditionalInfoApiService.delete(additionalInfoId)
    refetch()
  }

  const handleClickDetail = (additionalInfo: ProfessionalAdditionalInfo) => {
    toggleDetailDrawer()
    setSelectedRow(additionalInfo)
  }

  const mapAdditionalInfoToDetailItems = (
    additionalInfo: ProfessionalAdditionalInfo,
  ): { title: string; value: string }[] => [
    { title: t("professional.additional-info.information"), value: additionalInfo?.additional_information || "N/A" },
    { title: t("professional.additional-info.reference"), value: additionalInfo?.reference || "N/A" },
    {
      title: t("common.table-columns.created-at"),
      value: additionalInfo?.created_at ? formatCreatedAt(additionalInfo.created_at) : "N/A",
    },
  ]

  return (
    <Box>
      {showDrawer && (
        <AdditionalInfoDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          additionalInfo={selectedRow as ProfessionalAdditionalInfo}
          refetch={refetch}
          professionalId={professionalId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAdditionalInfoToDetailItems(selectedRow as ProfessionalAdditionalInfo)}
          id={selectedRow?.id || ""}
          hasReference={true}
          fileType="additional-info"
          title={t("professional.additional-info.details")}
        />
      )}

      <ItemsListing
        title={t("professional.additional-info.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: additionalInfoColumns(handleClickDetail, handleEdit, handleDelete, t),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AdditionalInfoCard
            onDetail={handleClickDetail}
            additionalInfo={data}
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
            subject: "professionaladditionalinfo",
          },
        }}
        fetchDataFunction={refetch}
        items={additionalInfos || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  )
}

export default AdditionalInfoList

