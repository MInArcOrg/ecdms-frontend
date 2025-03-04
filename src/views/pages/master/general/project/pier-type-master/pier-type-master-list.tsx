"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { PierType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import PierTypeMasterCard from "./pier-type-master-card"
import PierTypeMasterDrawer from "./pier-type-master-drawer"
import pierTypeMasterService from "src/services/general/project/pier-type-master-service"

const PierTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<PierType | null>(null)
  const { t } = useTranslation()
  const fetchPierTypeMaster = (params: GetRequestParam): Promise<IApiResponse<PierType[]>> => {
    return pierTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<PierType[]>({
    queryKey: ["general-master", "pier-type"],
    fetchFunction: fetchPierTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await pierTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as PierType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: PierType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <PierTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as PierType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.pier-types`)}
            ItemViewComponent={({ data }) => (
              <PierTypeMasterCard
                type={"pier-type"}
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
                subject: `piertype`,
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

export default PierTypeMasterList

