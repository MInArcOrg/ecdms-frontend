import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { StakeholderPhone } from "src/types/stakeholder";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface StakeholderPhoneCardProps {
  stakeholderPhone: StakeholderPhone;
  refetch: () => void;
  onEdit: (stakeholderPhone: StakeholderPhone) => void;
  onDelete: (id: string) => void;
}

const StakeholderPhoneCard: React.FC<StakeholderPhoneCardProps> = ({
  stakeholderPhone,
  refetch,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{p:1}}>
      <Box display="flex" justifyContent="space-between">
        {/* Info Column */}
        <Box mt={2}>{stakeholderPhone.phone && stakeholderPhone.phone}</Box>

        {/* Actions Column */}
        <Box display="flex" alignItems="center">
         
          <ModelActionComponent
            model="StakeholderPhone"
            model_id={stakeholderPhone.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title={"stakeholder.stakeholder-phone.title"}
            postAction={() => {
              /* Handle post action */
            }}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderPhone)}
            onDelete={() => onDelete(stakeholderPhone.id)}
            deletePermissionRule={{
              action: "delete",
              subject: "stakeholderphone",
            }}
            editPermissionRule={{
              action: "edit",
              subject: "stakeholderphone",
            }}
            item={stakeholderPhone}
            options={[]}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StakeholderPhoneCard;
