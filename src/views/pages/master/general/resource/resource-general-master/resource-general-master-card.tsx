// components/ResourceGeneralMasterList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { Fragment } from "react";
import { ResourceMasterModel } from "src/constants/master-data/resource-general-master-constants";
import { ResourceGeneralMaster } from "src/types/general/general-master";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelActionComponent from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

const ResourceGeneralMasterCard = ({
  resourceMasterModel,
  resourceGeneralMaster,
  onEdit,
  onDelete,
  refetch,
}: {
  resourceMasterModel: ResourceMasterModel;
  resourceGeneralMaster: ResourceGeneralMaster;
  onEdit: (category: ResourceGeneralMaster) => void;
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
                  {resourceGeneralMaster.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {resourceGeneralMaster.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Fragment>
                <FileDrawer
                  id={resourceGeneralMaster.id}
                  type={resourceMasterModel.fileType}
                />{" "}
                &nbsp;
                <ModelActionComponent
                  model={resourceMasterModel.dbModel}
                  model_id={resourceGeneralMaster.id}
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
                  onDelete={() => onDelete(resourceGeneralMaster.id)}
                  item={resourceGeneralMaster}
                  options={[]}
                  deletePermissionRule={{
                    action: "delete",
                    subject: resourceMasterModel.dbModel,
                  }}
                  editPermissionRule={{
                    action: "update",
                    subject: resourceMasterModel.dbModel,
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
export default ResourceGeneralMasterCard;
