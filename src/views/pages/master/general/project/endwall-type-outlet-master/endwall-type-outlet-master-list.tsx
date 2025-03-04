"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { EndwallTypeOutlet } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import EndwallTypeOutletMasterCard from "./endwall-type-outlet-master-card"
import EndwallTypeOutletMasterDrawer from "./endwall-type-outlet-master-drawer"
import endwallTypeOutletMasterService from "src/services/general/project/endwall-type-outlet-master-service"

const EndwallTypeOutletMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<EndwallTypeOutlet | null>(null)
  const { t } = useTranslation()
  const fetchEndwallTypeOutletMaster = (params: GetRequestParam): Promise<IApiResponse<EndwallTypeOutlet[]>> => {
    return endwallTypeOutletMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<EndwallTypeOutlet[]>({
    queryKey: ["general-master", "endwall-type-outlet"],
    fetchFunction: fetchEndwallTypeOutletMaster,
  })
  const handleDelete = async (id: string) => {
    await endwallTypeOutletMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as EndwallTypeOutlet)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: EndwallTypeOutlet) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <EndwallTypeOutletMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as EndwallTypeOutlet}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.endwall-type-outlets`)}
            ItemViewComponent={({ data }) => (
              <EndwallTypeOutletMasterCard
                type={"endwall-type-outlet"}
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
                subject: `endwalltypeoutlet`,
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

export default EndwallTypeOutletMasterList

