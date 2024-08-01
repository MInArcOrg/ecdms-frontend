import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { ProjectBond } from "src/types/project/project-finance";
import { formatCurrency } from "src/utils/formatter/currency";
import FileDrawer from "src/views/components/custom/files-drawer";
import RowOptions from "src/views/shared/listing/row-options";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { formatPercent } from "src/utils/formatter/number";
import { getDynamicDate } from "src/views/components/custom/ethio-calendar/ethio-calendar-utils";
import i18n from "src/configs/i18n";

const ProjectBondCard = ({
  projectBond,
  refetch,
  onEdit,
  type,
}: {
  type: string;
  projectBond: ProjectBond;
  refetch: () => void;
  onEdit: (projectBond: ProjectBond) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={projectBond?.issuing_institute || t("project.project-bond.form.no-title")}
        subheader={projectBond?.institution_type ? t(`institution.${projectBond.institution_type}`) : t("project.project-bond.form.no-subtitle")}
       
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
            {t("project.project-bond.form.amount")}
          </Typography>
          <Typography variant="h6">
            {formatCurrency(Number(projectBond?.amount))}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-bond.form.percent")}
          </Typography>
          <Typography variant="h6">
            {formatPercent(Number(projectBond?.percent))}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-bond.form.issue-date")}
          </Typography>
          <Typography variant="h6">
            {getDynamicDate(i18n, projectBond?.issue_date) || t("project.project-bond.form.no-date")}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="textSecondary">
            {t("project.project-bond.form.expiration-date")}
          </Typography>
          <Typography variant="h6">
            {getDynamicDate(i18n, projectBond?.issue_date) || t("project.project-bond.form.no-date")}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "space-between" }}>
        <FileDrawer id={projectBond.id} type={uploadableProjectFileTypes.payment} />
        
      </CardActions>
    </Card>
  );
};

export default ProjectBondCard;
