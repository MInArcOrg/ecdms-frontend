// components/RoadLengthTypeList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { RoadLengthType } from "src/types/general/general-master";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

const RoadLengthTypeMasterCard = ({
  generalMaster,
  onEdit,
  onDelete,
  refetch,
}: {
  type: string;
  generalMaster: RoadLengthType;
  onEdit: (category: RoadLengthType) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography variant="h5" component="div">
                  {generalMaster.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {generalMaster.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Fragment>
                <FileDrawer id={generalMaster.id} type="ROAD_LENGTH_TYPE" />{" "}
                &nbsp;
                <ModelActionComponent
                  model={"roadlengthtype"}
                  model_id={generalMaster.id}
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
                  onDelete={() => onDelete(generalMaster.id)}
                  item={generalMaster}
                  options={[]}
                  deletePermissionRule={{
                    action: "delete",
                    subject: "roadlengthtype",
                  }}
                  editPermissionRule={{
                    action: "update",
                    subject: "roadlengthtype",
                  }}
                />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Fragment>
  );
};
export default RoadLengthTypeMasterCard;
