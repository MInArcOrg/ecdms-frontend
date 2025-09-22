// components/SeverityLevelMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { SeverityLevel } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import SeverityLevelMasterCard from "./severity-level-master-card";
import SeverityLevelMasterDrawer from "./severity-level-master-drawer";
import severityLevelMasterService from "src/services/general/project/drainage-type-master-service";

const SeverityLevelMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SeverityLevel | null>(null);
  const { t } = useTranslation();
  const fetchSeverityLevelMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SeverityLevel[]>> => {
    return severityLevelMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SeverityLevel[]>({
    queryKey: ["general-master", "drainage-type"],
    fetchFunction: fetchSeverityLevelMaster,
  });
  const handleDelete = async (id: string) => {
    await severityLevelMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as SeverityLevel);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: SeverityLevel) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <SeverityLevelMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as SeverityLevel}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.drainage-types`)}
            ItemViewComponent={({ data }) => (
              <SeverityLevelMasterCard
                type={"drainage-type"}
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
                subject: `hydrologydefect`,
              },
            }}
            fetchDataFunction={refetch}
            items={types || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default SeverityLevelMasterList;
