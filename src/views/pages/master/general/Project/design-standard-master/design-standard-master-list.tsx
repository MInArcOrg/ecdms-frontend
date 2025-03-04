import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DesignStandard } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DesignStandardMasterCard from "./design-standard-master-card"
import DesignStandardMasterDrawer from "./design-standard-master-drawer"
import designStandardMasterService from "src/services/general/project/design-standard-master-service"

const DesignStandardMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DesignStandard | null>(null)
  const { t } = useTranslation()
  const fetchDesignStandardMaster = (params: GetRequestParam): Promise<IApiResponse<DesignStandard[]>> => {
    return designStandardMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DesignStandard[]>({
    queryKey: ["general-master", "design-standard"],
    fetchFunction: fetchDesignStandardMaster,
  })
  const handleDelete = async (id: string) => {
    await designStandardMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DesignStandard)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DesignStandard) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DesignStandardMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DesignStandard}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.design-standards`)}
            ItemViewComponent={({ data }) => (
              <DesignStandardMasterCard
                type={"design-standard"}
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
                subject: `designstandard`,
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

export default DesignStandardMasterList

