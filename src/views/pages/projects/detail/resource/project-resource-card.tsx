import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectResource } from 'src/types/project/project-resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProjectResourceCardProps {
  projectResource: ProjectResource;
  onDetail: (projectResource: ProjectResource) => void;
  onEdit: (projectResource: ProjectResource) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
}

const ProjectResourceCard: React.FC<ProjectResourceCardProps> = ({ projectResource, onDetail, onEdit, onDelete, refetch }) => {
  const { t } = useTranslation();

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12}>
            <Box>
              <Typography
                noWrap
                component={Button}
                onClick={() => onDetail(projectResource)}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {projectResource?.resource?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('resource.form.description')}:</span> <strong>{projectResource?.resource?.description ?? t('N/A')}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('resource.form.measurement-unit')}:</span>{' '}
                <strong>{projectResource?.resource?.measurement_unit ?? t('N/A')}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('resource.form.status')}:</span> <strong>{projectResource?.resource?.status ?? t('N/A')}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Fragment>
          <Box>
            <FileDrawer id={projectResource.id} type={uploadableProjectFileTypes.resource} /> &nbsp;
            <Box sx={{ display: 'flex' }}>
              <ModelActionComponent
                model="Project"
                model_id={projectResource.id}
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
                onDelete={() => onDelete(projectResource.id)}
                item={projectResource}
                deletePermissionRule={{
                  action: 'delete',
                  subject: 'projectresource'
                }}
                editPermissionRule={{
                  action: 'edit',
                  subject: 'projectresource'
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

export default ProjectResourceCard;
