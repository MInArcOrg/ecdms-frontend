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
import { MobileNetworkComponentAge } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface MobileNetworkComponentAgeCardProps {
  mobileNetworkComponentAge: MobileNetworkComponentAge;
  refetch: () => void;
  onEdit: (mobileNetworkComponentAge: MobileNetworkComponentAge) => void;
  onDelete: (id: string) => void;
  onDetail: (mobileNetworkComponentAge: MobileNetworkComponentAge) => void;
}

const MobileNetworkComponentAgeCard: React.FC<
  MobileNetworkComponentAgeCardProps
> = ({ mobileNetworkComponentAge, refetch, onEdit, onDelete, onDetail }) => {
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
              onClick={() => onDetail(mobileNetworkComponentAge)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {mobileNetworkComponentAge?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.mobile-network-component-age.details.mobile-network-id",
            )}
            : {mobileNetworkComponentAge?.mobile_network_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.cell")}:{" "}
            {mobileNetworkComponentAge?.cell?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.towers")}:{" "}
            {mobileNetworkComponentAge?.towers?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.antennas")}:{" "}
            {mobileNetworkComponentAge?.antennas?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.mobile-network-component-age.details.base-stations",
            )}
            : {mobileNetworkComponentAge?.base_stations?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.repeaters")}:{" "}
            {mobileNetworkComponentAge?.repeaters?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.switches")}:{" "}
            {mobileNetworkComponentAge?.switches?.toString() || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.mobile-network-component-age.details.others")}:{" "}
            {mobileNetworkComponentAge?.others || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={mobileNetworkComponentAge.id}
          type={uploadableProjectFileTypes.other.mobileNetworkComponentAge}
        />
        <ModelAction
          model="MobileNetworkComponentAge"
          model_id={mobileNetworkComponentAge.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "mobilenetworkcomponentage",
          }}
          editPermissionRule={{
            action: "update",
            subject: "mobilenetworkcomponentage",
          }}
          onEdit={() => onEdit(mobileNetworkComponentAge)}
          onDelete={() => onDelete(mobileNetworkComponentAge.id)}
          item={mobileNetworkComponentAge}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default MobileNetworkComponentAgeCard;
