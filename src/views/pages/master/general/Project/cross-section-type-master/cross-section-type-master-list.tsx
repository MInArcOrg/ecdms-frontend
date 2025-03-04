import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { CrossSectionType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import CrossSectionTypeMasterCard from "./cross-section-type-master-card"
import CrossSectionTypeMasterDrawer from "./cross-section-type-master-drawer"
import crossSectionTypeMasterService from "src/services/general/project/cross-section-type-master-service"

const CrossSectionTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<CrossSectionType | null>(null)
  const { t } = useTranslation()
  const fetchCrossSectionTypeMaster = (params: GetRequestParam): Promise<IApiResponse<CrossSectionType[]>> => {
    return crossSectionTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CrossSectionType[]>({
    queryKey: ["general-master", "cross-section-type"],
    fetchFunction: fetchCrossSectionTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await crossSectionTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as CrossSectionType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: CrossSectionType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <CrossSectionTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as CrossSectionType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.cross-section-types`)}
            ItemViewComponent={({ data }) => (
              <CrossSectionTypeMasterCard
                type={"cross-section-type"}
                generalMaster={data}
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
              onlyIcon: true,
              permission: {
                action: "create",
                subject: `crosssectiontype`,
              },
            }}
            fetchDataFunction={refetch}
            items={types || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  )
}

export default CrossSectionTypeMasterList

