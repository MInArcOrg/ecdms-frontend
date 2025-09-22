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
import type { BranchAdditionalInformation } from "src/types/stakeholder/branch-additional-information";
import type { StakeholderBranch } from "src/types/stakeholder/stakeholder-branch";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface AdditionalInformationCardProps {
  additionalInfo: BranchAdditionalInformation;
  refetch: () => void;
  onEdit: (additionalInfo: BranchAdditionalInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (additionalInfo: BranchAdditionalInformation) => void;
  stakeholderBranches: StakeholderBranch[];
}

const AdditionalInformationCard: React.FC<AdditionalInformationCardProps> = ({
  additionalInfo,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  stakeholderBranches,
}) => {
  const { t } = useTranslation();

  const getBranchName = (id: string) => {
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : "N/A";
  };

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
              {getBranchName(additionalInfo.stakeholder_branch_id)}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              "stakeholder.branch-additional-information.additionalInformation",
            )}
            : {additionalInfo.additional_information}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("stakeholder.branch-additional-information.reference")}:{" "}
            {additionalInfo.reference || t("common.not-available")}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ModelAction
          model="BranchAdditionalInformation"
          model_id={additionalInfo?.id || ""}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "branchadditionalinformation",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "branchadditionalinformation",
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

export default AdditionalInformationCard;
