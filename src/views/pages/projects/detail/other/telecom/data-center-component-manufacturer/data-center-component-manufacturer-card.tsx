import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { DataCenterComponentManufacturer } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface DataCenterComponentManufacturerCardProps {
  dataCenterComponentManufacturer: DataCenterComponentManufacturer;
  refetch: () => void;
  onEdit: (
    dataCenterComponentManufacturer: DataCenterComponentManufacturer,
  ) => void;
  onDelete: (id: string) => void;
  onDetail: (
    dataCenterComponentManufacturer: DataCenterComponentManufacturer,
  ) => void;
}

const DataCenterComponentManufacturerCard: React.FC<
  DataCenterComponentManufacturerCardProps
> = ({
  dataCenterComponentManufacturer,
  refetch,
  onEdit,
  onDelete,
  onDetail,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(dataCenterComponentManufacturer)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {dataCenterComponentManufacturer?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.data-center-id",
            )}
            : {dataCenterComponentManufacturer?.data_center_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.servers",
            )}
            : {dataCenterComponentManufacturer?.servers || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.storage-devices",
            )}
            : {dataCenterComponentManufacturer?.storage_devices || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.networking-equipment",
            )}
            : {dataCenterComponentManufacturer?.networking_equipment || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.cooling-systems",
            )}
            : {dataCenterComponentManufacturer?.cooling_systems || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.backup-generators",
            )}
            : {dataCenterComponentManufacturer?.backup_generators || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.data-center-component-manufacturer.details.others",
            )}
            : {dataCenterComponentManufacturer?.others || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={dataCenterComponentManufacturer.id}
          type={
            uploadableProjectFileTypes.other.dataCenterComponentManufacturer
          }
        />
        <ModelAction
          model="DataCenterComponentManufacturer"
          model_id={dataCenterComponentManufacturer.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "datacentercomponentmanufacturer",
          }}
          editPermissionRule={{
            action: "update",
            subject: "datacentercomponentmanufacturer",
          }}
          onEdit={() => onEdit(dataCenterComponentManufacturer)}
          onDelete={() => onDelete(dataCenterComponentManufacturer.id)}
          item={dataCenterComponentManufacturer}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DataCenterComponentManufacturerCard;
