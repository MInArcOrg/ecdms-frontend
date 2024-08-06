import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { ProjectStakeholder } from "src/types/project/project-stakeholder";
import { Stakeholder } from "src/types/stakeholders";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import StakeholderProfileCardComponent from "src/views/pages/stakeholders/stakeholder-profile";
import RowOptions from "src/views/shared/listing/row-options";

const ProjectStakeholderCard = ({
  projectStakeholder,
  refetch,
  onEdit,
  onDelete,
}: {
  projectStakeholder: ProjectStakeholder;
  refetch: () => void;
  onEdit: (projectStakeholder: ProjectStakeholder) => void;
  onDelete: (id: string) => void;
}) => {
  console.log('stakeholder', projectStakeholder.stakeholder)
  const { t } = useTranslation();
  console.log
  return (
    <Card>
      <CardContent>
        <StakeholderProfileCardComponent projectStakeholder={projectStakeholder} stakeholder={projectStakeholder?.stakeholder as Stakeholder }/>
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={projectStakeholder.id}
          type={uploadableProjectFileTypes.stakeholder}
        />{" "}
        &nbsp;
        <Box sx={{ display: "flex" }}>
          <ModelActionComponent
            model="Position"
            model_id={projectStakeholder.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
            title={""}
            postAction={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "projectstakeholder",
            }}
            editPermissionRule={{
              action: "edit",
              subject: "projectstakeholder",
            }}
            onEdit={onEdit}
            onDelete={() => onDelete(projectStakeholder.id)}
            item={projectStakeholder}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectStakeholderCard;
