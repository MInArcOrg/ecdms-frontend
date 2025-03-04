import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { IntersectionType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import IntersectionTypeMasterCard from "./intersection-type-master-card"
import IntersectionTypeMasterDrawer from "./intersection-type-master-drawer"
import intersectionTypeMasterService from "src/services/general/project/intersection-type-master-service"

const IntersectionTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<IntersectionType | null>(null)
  const { t } = useTranslation()
  const fetchIntersectionTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<IntersectionType[]>> => {
    return intersectionTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<IntersectionType[]>({
    queryKey: ["general-master", "intersection-type"],
    fetchFunction: fetchIntersectionTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await intersectionTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as IntersectionType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: IntersectionType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <IntersectionTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as IntersectionType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.intersection-types`)}
            ItemViewComponent={({ data }) => (
              <IntersectionTypeMasterCard
                type={"intersection-type"}
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
                subject: `intersectiontype`,
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

export default IntersectionTypeMasterList
