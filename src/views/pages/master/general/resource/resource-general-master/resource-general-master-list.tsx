// components/ResourceGeneralMaster.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import { ResourceMasterModel } from "src/constants/master-data/resource-general-master-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import resourceGeneralMasterDataApiService from "src/services/general/resource-general-master-data-service";
import { ResourceGeneralMaster } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import ResourceGeneralMasterCard from "./resource-general-master-card";
import ResourceGeneralMasterDrawer from "./resource-general-master-drawer";

interface ResourceGeneralMasterProps {
  resourceMasterModel: ResourceMasterModel;
}

const ResourceGeneralMasterList: React.FC<ResourceGeneralMasterProps> = ({
  resourceMasterModel,
}) => {
  const [selectedRow, setSelectedRow] = useState<ResourceGeneralMaster | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchResourceGeneralMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ResourceGeneralMaster[]>> => {
    return resourceGeneralMasterDataApiService.getAll({
      ...params,
      filter: { ...params.filter, model: resourceMasterModel.model },
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: resourceGeneralMasters,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ResourceGeneralMaster[]>({
    queryKey: ["general-master", resourceMasterModel.title],
    fetchFunction: fetchResourceGeneralMaster,
  });
  const handleDelete = async (resourceGeneralMasterSubCategoryId: string) => {
    await resourceGeneralMasterDataApiService.delete(
      resourceGeneralMasterSubCategoryId,
    );
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceGeneralMaster);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (ResourceGeneralMaster: ResourceGeneralMaster) => {
    toggleDrawer();
    setSelectedRow(ResourceGeneralMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <ResourceGeneralMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as ResourceGeneralMaster}
          refetch={refetch}
          resourceMasterModel={resourceMasterModel}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.${resourceMasterModel.title}`)}
            ItemViewComponent={({ data }) => (
              <ResourceGeneralMasterCard
                resourceMasterModel={resourceMasterModel}
                resourceGeneralMaster={data}
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
                subject: resourceMasterModel.dbModel,
              },
            }}
            fetchDataFunction={refetch}
            items={resourceGeneralMasters || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default ResourceGeneralMasterList;
