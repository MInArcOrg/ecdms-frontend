"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { BridgePartDefect } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import BridgePartDefectMasterCard from "./bridge-part-defect-master-card"
import BridgePartDefectMasterDrawer from "./bridge-part-defect-master-drawer"
import bridgePartDefectMasterService from "src/services/general/project/bridge-part-defect-master-service"

const BridgePartDefectMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<BridgePartDefect | null>(null)
  const { t } = useTranslation()
  const fetchBridgePartDefectMaster = (params: GetRequestParam): Promise<IApiResponse<BridgePartDefect[]>> => {
    return bridgePartDefectMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<BridgePartDefect[]>({
    queryKey: ["general-master", "bridge-part-defect"],
    fetchFunction: fetchBridgePartDefectMaster,
  })
  const handleDelete = async (id: string) => {
    await bridgePartDefectMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as BridgePartDefect)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: BridgePartDefect) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <BridgePartDefectMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as BridgePartDefect}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.bridge-part-defects`)}
            ItemViewComponent={({ data }) => (
              <BridgePartDefectMasterCard
                type={"bridge-part-defect"}
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
                subject: `bridgepartdefect`,
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

export default BridgePartDefectMasterList

