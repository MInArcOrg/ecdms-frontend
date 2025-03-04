"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { PavedWaterWayType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import PavedWaterWayTypeMasterCard from "./paved-water-way-type-master-card"
import PavedWaterWayTypeMasterDrawer from "./paved-water-way-type-master-drawer"
import pavedWaterWayTypeMasterService from "src/services/general/project/paved-water-way-type-master-service"

const PavedWaterWayTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<PavedWaterWayType | null>(null)
  const { t } = useTranslation()
  const fetchPavedWaterWayTypeMaster = (params: GetRequestParam): Promise<IApiResponse<PavedWaterWayType[]>> => {
    return pavedWaterWayTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<PavedWaterWayType[]>({
    queryKey: ["general-master", "paved-water-way-type"],
    fetchFunction: fetchPavedWaterWayTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await pavedWaterWayTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as PavedWaterWayType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: PavedWaterWayType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <PavedWaterWayTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as PavedWaterWayType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.paved-water-way-types`)}
            ItemViewComponent={({ data }) => (
              <PavedWaterWayTypeMasterCard
                type={"paved-water-way-type"}
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
                subject: `pavedwaterwaytype`,
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

export default PavedWaterWayTypeMasterList

