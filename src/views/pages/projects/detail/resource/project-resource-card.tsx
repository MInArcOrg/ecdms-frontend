import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectResource } from 'src/types/project/project-resource';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectResourceCard = ({
  projectResource,
  onDetail,
  onEdit,
  onDelete,
  refetch
}: {
  projectResource: ProjectResource;
  onDetail: (projectResource: ProjectResource) => void;
  onEdit: (projectResource: ProjectResource) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
}) => {
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
                {projectResource.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.resource.form.financial-year')}:</span> <strong>{String(projectResource.year) ?? t('N/A')}</strong>,{' '}
                {t('Quarter')}: <strong>{projectResource.quarter ?? t('N/A')}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.resource.form.physical-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectResource.physical_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.resource.form.financial-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectResource.financial_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.resource.form.project-expense')}:</span>{' '}
                <strong>{formatCurrency(Number(projectResource.project_expense)) ?? t('N/A')}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Fragment>
          <Tooltip title={t('View Files')}>
            <IconButton>
              <FileDrawer id={projectResource.file_id ?? ''} type={uploadableProjectFileTypes.resource} />
            </IconButton>
          </Tooltip>

          <ModelActionComponent
            model="ProjectResource"
            model_id={projectResource.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={onEdit}
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
        </Fragment>
      </CardActions>
    </Card>
  );
};
export default ProjectResourceCard;
