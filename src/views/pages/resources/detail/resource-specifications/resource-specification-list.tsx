import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "@mui/system";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import resourceSpecificationApiService from "src/services/resource/resource-specification-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import { ResourceSpecification } from "src/types/resource";
import ItemsListing from "src/views/shared/listing";
import ResourceSpecificationCard from "./resource-specification-card";
import ResourceSpecificationDrawer from "./resource-specification-drawer";

function ResourceSpecificationList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceSpecification | null>(
    null
  );
  const { t } = useTranslation();

  const fetchResourceSpecifications = (
    params: GetRequestParam
  ): Promise<IApiResponse<ResourceSpecification[]>> => {
    return resourceSpecificationApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId,
      },
    });
  };

  const {
    data: resourceSpecifications,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ResourceSpecification[]>({
    queryKey: ["resourceSpecifications", resourceId],
    fetchFunction: fetchResourceSpecifications,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceSpecification);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceSpecification: ResourceSpecification) => {
    toggleDrawer();
    setSelectedRow(resourceSpecification);
  };
  const handleDelete = (resourceSpecificationId: string) => {
    // Handle delete logic
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
      }}
    >
      {showDrawer && (
        <ResourceSpecificationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceSpecification={selectedRow as ResourceSpecification}
          refetch={refetch}
        />
      )}
      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <ResourceSpecificationCard
              resourceSpecification={data}
              onDelete={handleDelete}
              onEdit={handleEdit}
              t={t}
              refetch={refetch}
              children={undefined}            />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: "create",
              subject: "resourceSpecification",
            },
          }}
          fetchDataFunction={refetch}
         
          items={resourceSpecifications || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceSpecificationList;
