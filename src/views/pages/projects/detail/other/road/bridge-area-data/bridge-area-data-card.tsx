"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import type React from "react";
import { useTranslation } from "react-i18next";
import type { BridgeAreaData } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface BridgeAreaDataCardProps {
  bridgeAreaData: BridgeAreaData;
  refetch: () => void;
  onEdit: (bridgeAreaData: BridgeAreaData) => void;
  onDelete: (id: string) => void;
  onDetail: (bridgeAreaData: BridgeAreaData) => void;
}

const BridgeAreaDataCard: React.FC<BridgeAreaDataCardProps> = ({
  bridgeAreaData,
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
              onClick={() => onDetail(bridgeAreaData)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeAreaData?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-area-data.details.name")}:{" "}
            {bridgeAreaData?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-area-data.details.bridge-name")}:{" "}
            {bridgeAreaData?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-area-data.details.river-width")}:{" "}
            {bridgeAreaData?.river_width || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-area-data.details.area-topography-id")}:{" "}
            {bridgeAreaData?.area_topography_id || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BridgeAreaData"
          model_id={bridgeAreaData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "bridgeareadata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "bridgeareadata",
          }}
          onEdit={() => onEdit(bridgeAreaData)}
          onDelete={() => onDelete(bridgeAreaData.id)}
          item={bridgeAreaData}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default BridgeAreaDataCard;
