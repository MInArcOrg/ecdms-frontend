import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectPlan } from 'src/types/project/project-plan';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectPlanCard = ({
  projectPlan,
  onDetail,
  onEdit,
  onDelete,
  refetch
}: {
  projectPlan: ProjectPlan;
  onDetail: (projectPlan: ProjectPlan) => void;
  onEdit: (projectPlan: ProjectPlan) => void;
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
                onClick={() => onDetail(projectPlan)}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {projectPlan.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.plan.form.financial-year')}:</span> <strong>{String(projectPlan.year) ?? t('N/A')}</strong>,{' '}
                {t('Quarter')}: <strong>{projectPlan.quarter ?? t('N/A')}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.plan.form.physical-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectPlan.physical_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.plan.form.financial-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectPlan.financial_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.plan.form.project-expense')}:</span>{' '}
                <strong>{formatCurrency(Number(projectPlan.project_expense)) ?? t('N/A')}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Fragment>
          <Tooltip title={t('View Files')}>
            <IconButton>
              <FileDrawer id={projectPlan.file_id ?? ''} type={uploadableProjectFileTypes.plan} />
            </IconButton>
          </Tooltip>

          <ModelActionComponent
            model="ProjectPlan"
            model_id={projectPlan.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(projectPlan.id)}
            item={projectPlan}
            deletePermissionRule={{
              action: 'delete',
              subject: 'projectplan'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'projectplan'
            }}
            options={[]}
          />
        </Fragment>
      </CardActions>
    </Card>
  );
};
export default ProjectPlanCard;
