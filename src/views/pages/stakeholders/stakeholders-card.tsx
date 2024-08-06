/* eslint-disable prettier/prettier */

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { Stakeholder } from "src/types/stakeholders";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

const StakeholderCard = ({
  stakeholders,
  onEdit,
  onDelete,
  refetch,
}: {
  stakeholders: Stakeholder;
  onEdit: (category: Stakeholder) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography variant="h5" component="div">
                  {stakeholders.trade_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stakeholders.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Fragment>
                <Box>
                  <FileDrawer id={stakeholders.id} type={"RESOURCE"} /> &nbsp;
                  <Box sx={{ display: "flex" }}>
                    <ModelActionComponent
                      model="Position"
                      model_id={stakeholders.id}
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
                      onDelete={() => onDelete(stakeholders.id)}
                      item={stakeholders}
                      options={[]}
                    />
                  </Box>
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default StakeholderCard;
