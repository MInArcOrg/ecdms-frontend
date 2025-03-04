import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DrivewayAccessPoint } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DrivewayAccessPointMasterCard from "./driveway-access-point-master-card"
import DrivewayAccessPointMasterDrawer from "./driveway-access-point-master-drawer"
import drivewayAccessPointMasterService from "src/services/general/project/driveway-access-point-master-service"

const DrivewayAccessPointMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DrivewayAccessPoint | null>(null)
  const { t } = useTranslation()
  const fetchDrivewayAccessPointMaster = (params: GetRequestParam): Promise<IApiResponse<DrivewayAccessPoint[]>> => {
    return drivewayAccessPointMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DrivewayAccessPoint[]>({
    queryKey: ["general-master", "driveway-access-point"],
    fetchFunction: fetchDrivewayAccessPointMaster,
  })
  const handleDelete = async (id: string) => {
    await drivewayAccessPointMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DrivewayAccessPoint)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DrivewayAccessPoint) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DrivewayAccessPointMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DrivewayAccessPoint}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.driveway-access-points`)}
            ItemViewComponent={({ data }) => (
              <DrivewayAccessPointMasterCard
                type={"driveway-access-point"}
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
                subject: `drivewayaccesspoint`,
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

export default DrivewayAccessPointMasterList

