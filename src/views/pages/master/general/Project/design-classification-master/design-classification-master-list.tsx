import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DesignClassification } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DesignClassificationMasterCard from "./design-classification-master-card"
import DesignClassificationMasterDrawer from "./design-classification-master-drawer"
import designClassificationMasterService from "src/services/general/project/design-classification-master-service"

const DesignClassificationMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DesignClassification | null>(null)
  const { t } = useTranslation()
  const fetchDesignClassificationMaster = (params: GetRequestParam): Promise<IApiResponse<DesignClassification[]>> => {
    return designClassificationMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DesignClassification[]>({
    queryKey: ["general-master", "design-classification"],
    fetchFunction: fetchDesignClassificationMaster,
  })
  const handleDelete = async (id: string) => {
    await designClassificationMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DesignClassification)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DesignClassification) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DesignClassificationMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DesignClassification}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.design-classifications`)}
            ItemViewComponent={({ data }) => (
              <DesignClassificationMasterCard
                type={"design-classification"}
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
                subject: `designclassification`,
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

export default DesignClassificationMasterList

