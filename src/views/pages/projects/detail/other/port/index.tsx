import { Box } from "@mui/material";
import { useState } from "react";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import PortCard from "./port-card";
import PortDrawer from "./port-drawer";
import { Port } from "src/types/project/other";
import otherApiService from "src/services/project/other-service";
import { portColumns } from "./port-row";
import { useTranslation } from "react-i18next";
import OtherDetailSidebar from "../layouts/other-detail-drawer";

interface PortListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const PortList: React.FC<PortListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Port | null>(null);
  const { t } = useTranslation();
  console.log('show detail drawer',showDetailDrawer,selectedRow)
  const fetchPorts = (
    params: GetRequestParam
  ): Promise<IApiResponse<Port[]>> => {
    return otherApiService<Port>().getAll(model, {
      ...params,
      filter: { ...params.filter },
    });
  };

  const {
    data: ports,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Port[]>({
    queryKey: ["ports"],
    fetchFunction: fetchPorts,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Port);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Port);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (port: Port) => {
    setSelectedRow(port);
    toggleDrawer();
  };

  const handleDelete = async (portId: string) => {
    await otherApiService<Port>().delete(model, portId);
    refetch();
  };

  const handleClickDetail = (port: Port) => {
    toggleDetailDrawer();
    setSelectedRow(port);
  };

  const mapPortToDetailItems = (
    port: Port
  ): { title: string; value: string }[] => [
    { title: "Owner", value: port?.owner || "N/A" },
    { title: "Operator", value: port?.operator || "N/A" },
    { title: "Port Type", value: port?.port_type || "N/A" },
    {
      title: "Site Area",
      value: port?.site_area ? `${port?.site_area} sqm` : "N/A",
    },
    {
      title: "Annual Traffic Size",
      value: port?.annual_traffic_size
        ? `${port?.annual_traffic_size} tons`
        : "N/A",
    },
    { title: "Revision No", value: port?.revision_no?.toString() || "N/A" },
    {
      title: "Created At",
      value: port?.created_at ? port?.created_at : "N/A",
    },
    {
      title: "Updated At",
      value: port?.updated_at ? port?.updated_at : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <PortDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          port={selectedRow as Port}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer  && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPortToDetailItems(selectedRow as Port)}
          hasReference={true} // Assuming ports have references, adjust as necessary
          id={selectedRow?.id||""}
          fileType={model}
          title="Port Details"
        />
      )}

      <ItemsListing
        title={t("project.port.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: portColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PortCard
            port={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "port", 
          },
        }}
        fetchDataFunction={refetch}
        items={ports || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default PortList;
