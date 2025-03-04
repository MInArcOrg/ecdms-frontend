import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { FunctionalClassification } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import FunctionalClassificationMasterCard from "./functional-classification-master-card"
import FunctionalClassificationMasterDrawer from "./functional-classification-master-drawer"
import functionalClassificationMasterService from "src/services/general/project/functional-classification-master-service"

const FunctionalClassificationMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<FunctionalClassification | null>(null)
  const { t } = useTranslation()
  const fetchFunctionalClassificationMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<FunctionalClassification[]>> => {
    return functionalClassificationMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<FunctionalClassification[]>({
    queryKey: ["general-master", "functional-classification"],
    fetchFunction: fetchFunctionalClassificationMaster,
  })
  const handleDelete = async (id: string) => {
    await functionalClassificationMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as FunctionalClassification)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: FunctionalClassification) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <FunctionalClassificationMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as FunctionalClassification}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.functional-classifications`)}
            ItemViewComponent={({ data }) => (
              <FunctionalClassificationMasterCard
                type={"functional-classification"}
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
                subject: `functionalclassification`,
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

export default FunctionalClassificationMasterList

