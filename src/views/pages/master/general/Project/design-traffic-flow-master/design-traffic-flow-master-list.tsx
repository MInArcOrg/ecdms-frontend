import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DesignTrafficFlow } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DesignTrafficFlowMasterCard from "./design-traffic-flow-master-card"
import DesignTrafficFlowMasterDrawer from "./design-traffic-flow-master-drawer"
import designTrafficFlowMasterService from "src/services/general/project/design-traffic-flow-master-service"

const DesignTrafficFlowMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DesignTrafficFlow | null>(null)
  const { t } = useTranslation()
  const fetchDesignTrafficFlowMaster = (params: GetRequestParam): Promise<IApiResponse<DesignTrafficFlow[]>> => {
    return designTrafficFlowMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DesignTrafficFlow[]>({
    queryKey: ["general-master", "design-traffic-flow"],
    fetchFunction: fetchDesignTrafficFlowMaster,
  })
  const handleDelete = async (id: string) => {
    await designTrafficFlowMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DesignTrafficFlow)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DesignTrafficFlow) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DesignTrafficFlowMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DesignTrafficFlow}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.design-traffic-flows`)}
            ItemViewComponent={({ data }) => (
              <DesignTrafficFlowMasterCard
                type={"design-traffic-flow"}
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
                subject: `designtrafficflow`,
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

export default DesignTrafficFlowMasterList

