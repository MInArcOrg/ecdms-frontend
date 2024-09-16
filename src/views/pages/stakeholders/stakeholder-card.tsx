/* eslint-disable prettier/prettier */

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider
} from "@mui/material";
import { Fragment } from "react";
import { Stakeholder } from "src/types/stakeholder";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import StakeholderProfileCardComponent from "./stakeholder-profile";

const StakeholderCard = ({
  stakeholder,

  onEdit,
  onDelete,
  refetch,
}: {
  stakeholder: Stakeholder;
  onEdit: (category: Stakeholder) => void;

  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Card>
      <CardContent>
        <StakeholderProfileCardComponent
          stakeholder={stakeholder}
        />
      </CardContent>
      <Divider />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Fragment>
          <Box>
            <FileDrawer id={stakeholder.id} type={"RESOURCE"} /> &nbsp;
            <Box sx={{ display: "flex" }}>
              <ModelActionComponent
                model="Stakeholder"
                model_id={stakeholder.id}

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
                onEdit={onEdit}
                onDelete={() => onDelete(stakeholder.id)}
                item={stakeholder}
                deletePermissionRule={{
                  action: 'delete',
                  subject: 'stakeholder',
                }}
                editPermissionRule={{
                  action: 'edit',
                  subject: 'stakeholder'
                }}
                options={[]}
              />
            </Box>
          </Box>
        </Fragment>
      </CardActions>
    </Card>
  );
};
export default StakeholderCard;
