"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { AbutmentType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import AbutmentTypeMasterCard from "./abutment-type-master-card"
import AbutmentTypeMasterDrawer from "./abutment-type-master-drawer"
import abutmentTypeMasterService from "src/services/general/project/abutment-type-master-service"

const AbutmentTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<AbutmentType | null>(null)
  const { t } = useTranslation()
  const fetchAbutmentTypeMaster = (params: GetRequestParam): Promise<IApiResponse<AbutmentType[]>> => {
    return abutmentTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<AbutmentType[]>({
    queryKey: ["general-master", "abutment-type"],
    fetchFunction: fetchAbutmentTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await abutmentTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as AbutmentType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: AbutmentType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <AbutmentTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as AbutmentType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.abutment-types`)}
            ItemViewComponent={({ data }) => (
              <AbutmentTypeMasterCard
                type={"abutment-type"}
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
                subject: `abutmenttype`,
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

export default AbutmentTypeMasterList

