import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { ProjectPlan } from "src/types/project/project-plan";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

const ProjectPlanCard = ({
  projectPlan,
  refetch,
  onEdit,
  onDelete,
}: {
  projectPlan: ProjectPlan;
  refetch: () => void;
  onEdit: (projectPlan: ProjectPlan) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();
  console.log
  return (
    <Card>
      <CardContent>
        {/* <PlanProfileCardComponent projectPlan={projectPlan} plan={projectPlan?.plan as Plan }/> */}
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <FileDrawer
          id={projectPlan.id}
          type={uploadableProjectFileTypes.plan}
        />{" "}
        &nbsp;
        <Box sx={{ display: "flex" }}>
          <ModelActionComponent
            model="Plan"
            model_id={projectPlan.id}
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
              subject: "projectplan",
            }}
            editPermissionRule={{
              action: "edit",
              subject: "projectplan",
            }}
            onEdit={onEdit}
            onDelete={() => onDelete(projectPlan.id)}
            item={projectPlan}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectPlanCard;
