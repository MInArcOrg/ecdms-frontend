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
import type { ProfessionalAdditionalInfo } from "src/types/resource";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface AdditionalInfoCardProps {
  additionalInfo: ProfessionalAdditionalInfo;
  refetch: () => void;
  onEdit: (additionalInfo: ProfessionalAdditionalInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (additionalInfo: ProfessionalAdditionalInfo) => void;
}

const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({
  additionalInfo,
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
              onClick={() => onDetail(additionalInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: "none",
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              {additionalInfo?.additional_information}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t("professional.additional-info.reference")}:{" "}
            {additionalInfo?.reference || "N/A"}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={additionalInfo?.id || ""}
          type={uploadableResourceFileTypes.resource}
        />
        <ModelAction
          model="ProfessionalAdditionalInfo"
          model_id={additionalInfo?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "professionaladditionalinfo",
          }}
          editPermissionRule={{
            action: "update",
            subject: "professionaladditionalinfo",
          }}
          onEdit={() => onEdit(additionalInfo)}
          onDelete={() => onDelete(additionalInfo?.id || "")}
          item={additionalInfo}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default AdditionalInfoCard;
