"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { ExpansionJointType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import ExpansionJointTypeMasterCard from "./expansion-joint-type-master-card"
import ExpansionJointTypeMasterDrawer from "./expansion-joint-type-master-drawer"
import expansionJointTypeMasterService from "src/services/general/project/expansion-joint-type-master-service"

const ExpansionJointTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<ExpansionJointType | null>(null)
  const { t } = useTranslation()
  const fetchExpansionJointTypeMaster = (params: GetRequestParam): Promise<IApiResponse<ExpansionJointType[]>> => {
    return expansionJointTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ExpansionJointType[]>({
    queryKey: ["general-master", "expansion-joint-type"],
    fetchFunction: fetchExpansionJointTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await expansionJointTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as ExpansionJointType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: ExpansionJointType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <ExpansionJointTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as ExpansionJointType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.expansion-joint-types`)}
            ItemViewComponent={({ data }) => (
              <ExpansionJointTypeMasterCard
                type={"expansion-joint-type"}
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
                subject: `expansionjointtype`,
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

export default ExpansionJointTypeMasterList

