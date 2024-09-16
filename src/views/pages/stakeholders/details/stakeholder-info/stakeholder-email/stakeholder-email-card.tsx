import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { StakeholderEmail } from "src/types/stakeholder";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface StakeholderEmailCardProps {
  stakeholderEmail: StakeholderEmail;
  refetch: () => void;
  onEdit: (stakeholderEmail: StakeholderEmail) => void;
  onDelete: (id: string) => void;
}

const StakeholderEmailCard: React.FC<StakeholderEmailCardProps> = ({
  stakeholderEmail,
  refetch,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{p:1}}>
      <Box display="flex" justifyContent="space-between">
        {/* Info Column */}
        <Box mt={2}>{stakeholderEmail.email && stakeholderEmail.email}</Box>

        {/* Actions Column */}
        <Box display="flex" alignItems="center">
        
          <ModelActionComponent
            model="StakeholderEmail"
            model_id={stakeholderEmail.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title={"stakeholder.stakeholder-email.title"}
            postAction={() => {
              /* Handle post action */
            }}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderEmail)}
            onDelete={() => onDelete(stakeholderEmail.id)}
            deletePermissionRule={{
              action: "delete",
              subject: "stakeholderemail",
            }}
            editPermissionRule={{
              action: "edit",
              subject: "stakeholderemail",
            }}
            item={stakeholderEmail}
            options={[]}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StakeholderEmailCard;
