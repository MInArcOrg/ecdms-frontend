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
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import type { RoadDrainage } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface RoadDrainageCardProps {
  roadDrainage: RoadDrainage;
  refetch: () => void;
  onEdit: (roadDrainage: RoadDrainage) => void;
  onDelete: (id: string) => void;
  onDetail: (roadDrainage: RoadDrainage) => void;
}

const RoadDrainageCard: React.FC<RoadDrainageCardProps> = ({
  roadDrainage,
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
              onClick={() => onDetail(roadDrainage)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {roadDrainage?.name || roadDrainage?.id.slice(0, 5) + "..."}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-drainage.details.current-condition-id")}:{" "}
            {roadDrainage?.current_condition_id || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-drainage.details.dimensions")}:
            {roadDrainage?.length ? `L: ${roadDrainage.length}` : ""}
            {roadDrainage?.width ? ` W: ${roadDrainage.width}` : ""}
            {roadDrainage?.height ? ` H: ${roadDrainage.height}` : ""}
            {!roadDrainage?.length &&
            !roadDrainage?.width &&
            !roadDrainage?.height
              ? "N/A"
              : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              "project.other.road-drainage.details.construction-completion-year",
            )}
            : {roadDrainage?.construction_completion_year || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.other.road-drainage.details.remark")}:{" "}
            {roadDrainage?.remark || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={roadDrainage.id}
          type={uploadableProjectFileTypes.other.roadDrainage}
        />
        <ModelAction
          model="RoadDrainage"
          model_id={roadDrainage.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "roaddrainage",
          }}
          editPermissionRule={{
            action: "update",
            subject: "roaddrainage",
          }}
          onEdit={() => onEdit(roadDrainage)}
          onDelete={() => onDelete(roadDrainage.id)}
          item={roadDrainage}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RoadDrainageCard;
