"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DamageType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DamageTypeMasterCard from "./damage-type-master-card"
import DamageTypeMasterDrawer from "./damage-type-master-drawer"
import damageTypeMasterService from "src/services/general/project/damage-type-master-service"

const DamageTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DamageType | null>(null)
  const { t } = useTranslation()
  const fetchDamageTypeMaster = (params: GetRequestParam): Promise<IApiResponse<DamageType[]>> => {
    return damageTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DamageType[]>({
    queryKey: ["general-master", "damage-type"],
    fetchFunction: fetchDamageTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await damageTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DamageType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DamageType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DamageTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DamageType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.damage-types`)}
            ItemViewComponent={({ data }) => (
              <DamageTypeMasterCard
                type={"damage-type"}
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
                subject: `damagetype`,
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

export default DamageTypeMasterList

