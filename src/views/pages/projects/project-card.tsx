// components/ProjectList.tsx
import { Box, Card, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';
import { Fragment } from 'react';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { Project } from 'src/types/project';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectCard = ({
  project,
  onDetail,
  onEdit,
  onDelete,
  refetch
}: {
  project: Project;
  onDetail: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography
                  noWrap
                  component={Link}
                  href=""
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {project.name}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography> */}
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <FileDrawer id={project.id} type={uploadableProjectFileTypes.project} /> &nbsp;
                  <Box sx={{ display: 'flex' }}>
                    <ModelActionComponent
                      model="Project"
                      model_id={project.id}
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
                      onDelete={() => onDelete(project.id)}
                      item={project}
                      deletePermissionRule={{
                        action: 'delete',
                        subject: 'project'
                      }}
                      editPermissionRule={{
                        action: 'edit',
                        subject: 'project'
                      }}
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
export default ProjectCard;
