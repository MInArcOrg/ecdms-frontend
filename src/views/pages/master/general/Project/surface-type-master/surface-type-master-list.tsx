import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { SurfaceType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import SurfaceTypeMasterCard from "./surface-type-master-card"
import SurfaceTypeMasterDrawer from "./surface-type-master-drawer"
import surfaceTypeMasterService from "src/services/general/project/surface-type-master-service"

const SurfaceTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SurfaceType | null>(null)
  const { t } = useTranslation()
  const fetchSurfaceTypeMaster = (params: GetRequestParam): Promise<IApiResponse<SurfaceType[]>> => {
    return surfaceTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SurfaceType[]>({
    queryKey: ["general-master", "surface-type"],
    fetchFunction: fetchSurfaceTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await surfaceTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as SurfaceType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: SurfaceType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <SurfaceTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as SurfaceType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.surface-types`)}
            ItemViewComponent={({ data }) => (
              <SurfaceTypeMasterCard
                type={"surface-type"}
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
                subject: `surfacetype`,
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

export default SurfaceTypeMasterList

