"use client"

import { Card, CardContent } from "@mui/material"
import type React from "react"
import { Fragment, useState } from "react"
import { useTranslation } from "react-i18next"
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants"
import usePaginatedFetch from "src/hooks/use-paginated-fetch"
import type { DeckSlabType } from "src/types/general/general-master"
import { defaultCreateActionConfig } from "src/types/general/listing"
import type { GetRequestParam, IApiResponse } from "src/types/requests"
import ItemsListing from "src/views/shared/listing"
import DeckSlabTypeMasterCard from "./deck-slab-type-master-card"
import DeckSlabTypeMasterDrawer from "./deck-slab-type-master-drawer"
import deckSlabTypeMasterService from "src/services/general/project/deck-slab-type-master-service"

const DeckSlabTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DeckSlabType | null>(null)
  const { t } = useTranslation()
  const fetchDeckSlabTypeMaster = (params: GetRequestParam): Promise<IApiResponse<DeckSlabType[]>> => {
    return deckSlabTypeMasterService.getAll(params)
  }
  const [showDrawer, setShowDrawer] = useState<boolean>()

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DeckSlabType[]>({
    queryKey: ["general-master", "deck-slab-type"],
    fetchFunction: fetchDeckSlabTypeMaster,
  })
  const handleDelete = async (id: string) => {
    await deckSlabTypeMasterService.delete(id)
    refetch()
  }

  const toggleDrawer = () => {
    setSelectedRow({} as DeckSlabType)
    setShowDrawer(!showDrawer)
  }

  const handleEdit = (generalMaster: DeckSlabType) => {
    toggleDrawer()
    setSelectedRow(generalMaster)
  }
  return (
    <Fragment>
      {showDrawer && (
        <DeckSlabTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DeckSlabType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.deck-slab-types`)}
            ItemViewComponent={({ data }) => (
              <DeckSlabTypeMasterCard
                type={"deck-slab-type"}
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
                subject: `deckslabtype`,
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

export default DeckSlabTypeMasterList

