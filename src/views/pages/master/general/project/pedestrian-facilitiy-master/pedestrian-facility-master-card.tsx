// components/PedestrianFacilityList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { PedestrianFacility } from "src/types/general/general-master";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

const PedestrianFacilityMasterCard = ({
  generalMaster,
  onEdit,
  onDelete,
  refetch,
}: {
  generalMaster: PedestrianFacility;
  onEdit: (category: PedestrianFacility) => void;
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
                <FileDrawer id={generalMaster.id} type="PEDESTRIAN_FACILITY" />{" "}
                &nbsp;
                <ModelActionComponent
                  model={"pedestrianfacility"}
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
                  editPermissionRule={{
                    action: "update",
                    subject: "pedestrianfacility",
                  }}
                  deletePermissionRule={{
                    action: "delete",
                    subject: "pedestrianfacility",
                  }}
                  item={generalMaster}
                  options={[]}
                />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Fragment>
  );
};
export default PedestrianFacilityMasterCard;
