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
import type { BridgeSubStructure } from "src/types/project/other";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface BridgeSubStructureCardProps {
  bridgeSubStructure: BridgeSubStructure;
  refetch: () => void;
  onEdit: (bridgeSubStructure: BridgeSubStructure) => void;
  onDelete: (id: string) => void;
  onDetail: (bridgeSubStructure: BridgeSubStructure) => void;
}

const BridgeSubStructureCard: React.FC<BridgeSubStructureCardProps> = ({
  bridgeSubStructure,
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
              onClick={() => onDetail(bridgeSubStructure)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {bridgeSubStructure?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-sub-structure.details.name")}:{" "}
            {bridgeSubStructure?.name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-sub-structure.details.bridge-name")}:{" "}
            {bridgeSubStructure?.bridge_name || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-sub-structure.details.pier-type-id")}:{" "}
            {bridgeSubStructure?.pier_type_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.bridge-sub-structure.details.piers-number")}:{" "}
            {bridgeSubStructure?.piers_number || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BridgeSubStructure"
          model_id={bridgeSubStructure.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "bridgesubstructure",
          }}
          editPermissionRule={{
            action: "update",
            subject: "bridgesubstructure",
          }}
          onEdit={() => onEdit(bridgeSubStructure)}
          onDelete={() => onDelete(bridgeSubStructure.id)}
          item={bridgeSubStructure}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default BridgeSubStructureCard;
