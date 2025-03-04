import { Box, CardActions, CardContent, Grid, Typography } from "@mui/material"
import { Fragment } from "react"
import type { EndwallTypeOutlet } from "src/types/general/general-master"
import FileDrawer from "src/views/components/custom/files-drawer"
import ModelActionComponent from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

const EndwallTypeOutletMasterCard = ({
  generalMaster,
  onEdit,
  onDelete,
  refetch,
}: {
  type: string
  generalMaster: EndwallTypeOutlet
  onEdit: (category: EndwallTypeOutlet) => void
  onDelete: (id: string) => void
  t: any
  refetch: () => void
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
                <FileDrawer id={generalMaster.id} type={uploadableProjectFileTypes.endwallTypeOutlet} /> &nbsp;
                <ModelActionComponent
                  model={"endwalltypeoutlet"}
                  model_id={generalMaster.id}
                  refetchModel={refetch}
                  resubmit={(): void => {
                    throw new Error("Function not implemented.")
                  }}
                  title={""}
                  postAction={(): void => {
                    throw new Error("Function not implemented.")
                  }}
                />
                <RowOptions
                  onEdit={onEdit}
                  onDelete={() => onDelete(generalMaster.id)}
                  item={generalMaster}
                  options={[]}
                  deletePermissionRule={{
                    action: "delete",
                    subject: "endwalltypeoutlet",
                  }}
                  editPermissionRule={{
                    action: "update",
                    subject: "endwalltypeoutlet",
                  }}
                />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Fragment>
  )
}
export default EndwallTypeOutletMasterCard

