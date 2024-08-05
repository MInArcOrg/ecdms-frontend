import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

import i18n from "src/configs/i18n";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { ProjectStakeholder } from "src/types/project/project-stakeholder";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import FileDrawer from "src/views/components/custom/files-drawer";
import RowOptions from "src/views/shared/listing/row-options";

const StakeholderCard = ({
  projectStakeholder,
  onEdit,
  onDelete,
}: {
  projectStakeholder: ProjectStakeholder;
  onEdit: (projectStakeholder: ProjectStakeholder) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={projectStakeholder?.trade_name || t("project.project-stakeholder.form.no-title")}
        subheader={projectStakeholder?.stakeholdertype_id ? t(`stakeholderType.${projectStakeholder.stakeholdertype_id}`) : t("project.project-stakeholder.form.no-subtitle")}
      />
      <Divider />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-stakeholder.form.tin")}
          </Typography>
          <Typography variant="h6">
            {projectStakeholder?.tin}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-stakeholder.form.origin")}
          </Typography>
          <Typography variant="h6">
            {projectStakeholder?.origin}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-stakeholder.form.license-issued-date")}
          </Typography>
          <Typography variant="h6">
            {/* {getDynamicDate(i18n, projectStakeholder?.license_issued_date).toLocaleDateString() || t("project.project-stakeholder.form.no-date")} */}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-stakeholder.form.revision-no")}
          </Typography>
          <Typography variant="h6">
            {projectStakeholder?.revision_no}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "space-between" }}>
        <FileDrawer id={projectStakeholder.id} type={uploadableProjectFileTypes.payment} />
        <RowOptions 
          deletePermissionRule={{
            action: 'delete',
            subject: 'project-stakeholder'
          }} 
          editPermissionRule={{
            action: 'edit',
            subject: 'project-stakeholder'
          }}
          onEdit={onEdit} 
          onDelete={() => onDelete(projectStakeholder.id)} 
          item={projectStakeholder} 
          options={[]} 
        />
      </CardActions>
    </Card>
  );
};

export default StakeholderCard;
