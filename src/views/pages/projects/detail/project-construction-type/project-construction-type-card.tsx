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
import { uploadableResourceFileTypes } from "src/services/utils/file-constants";
import type { ProjectConstructionType } from "src/types/project/project-construction-type";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface ConstructionTypeCardProps {
  constructionType: ProjectConstructionType;
  refetch: () => void;
  onEdit: (constructionType: ProjectConstructionType) => void;
  onDelete: (id: string) => void;
  onDetail: (constructionType: ProjectConstructionType) => void;
}

const ConstructionTypeCard: React.FC<ConstructionTypeCardProps> = ({
  constructionType,
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
              onClick={() => onDetail(constructionType)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {t("project.construction-type.title")}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("project.construction-type.construction-type")}:{" "}
            {constructionType.construction_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("project.construction-type.description")}:{" "}
            {constructionType.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={constructionType?.id || ""}
          type={uploadableResourceFileTypes.project_construction_type}
        />
        <ModelAction
          model="ProjectConstructionType"
          model_id={constructionType?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "projectconstructiontype",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "projectconstructiontype",
          }}
          onEdit={() => onEdit(constructionType)}
          onDelete={() => onDelete(constructionType?.id || "")}
          item={constructionType}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ConstructionTypeCard;
