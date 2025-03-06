// components/ProjectGeneralMasterList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { ProjectMasterModel } from 'src/constants/master-data/project-general-master-constants';
import { ProjectGeneralMaster } from 'src/types/general/general-master';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectGeneralMasterCard = ({
  projectMasterModel,
  projectGeneralMaster,
  onEdit,
  onDelete,
  refetch
}: {
  projectMasterModel: ProjectMasterModel;
  projectGeneralMaster: ProjectGeneralMaster;
  onEdit: (category: ProjectGeneralMaster) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="h5" component="div">
                  {projectGeneralMaster.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {projectGeneralMaster.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <FileDrawer id={projectGeneralMaster.id} type={projectMasterModel.fileType} /> &nbsp;
                <ModelActionComponent
                  model={projectMasterModel.dbModel}
                  model_id={projectGeneralMaster.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions
                  onEdit={onEdit}
                  onDelete={() => onDelete(projectGeneralMaster.id)}
                  item={projectGeneralMaster}
                  options={[]}
                   deletePermissionRule={{
                    action: 'delete',
                    subject: projectMasterModel.dbModel
                  }}
                  editPermissionRule={{
                    action: 'update',
                    subject: projectMasterModel.dbModel
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
export default ProjectGeneralMasterCard;
