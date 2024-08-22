import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectReport } from 'src/types/project/project-report';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const ProjectReportCard = ({
  projectReport,
  onDetail,
  onEdit,
  onDelete,
  refetch
}: {
  projectReport: ProjectReport;
  onDetail: (projectReport: ProjectReport) => void;
  onEdit: (projectReport: ProjectReport) => void;
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
                onClick={() => onDetail(projectReport)}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {projectReport.type}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.report.form.financial-year')}:</span> <strong>{String(projectReport.year) ?? t('N/A')}</strong>,{' '}
                {t('Quarter')}: <strong>{projectReport.quarter ?? t('N/A')}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.report.form.physical-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectReport.physical_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.report.form.financial-performance')}:</span>{' '}
                <strong>{formatCurrency(Number(projectReport.financial_performance))}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                <span>{t('project.report.form.project-expense')}:</span>{' '}
                <strong>{formatCurrency(Number(projectReport.project_expense)) ?? t('N/A')}</strong>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Fragment>
          <Tooltip title={t('View Files')}>
            <IconButton>
              <FileDrawer id={projectReport.file_id ?? ''} type={uploadableProjectFileTypes.report} />
            </IconButton>
          </Tooltip>

          <ModelActionComponent
            model="ProjectReport"
            model_id={projectReport.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(projectReport.id)}
            item={projectReport}
            deletePermissionRule={{
              action: 'delete',
              subject: 'projectreport'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'projectreport'
            }}
            options={[]}
          />
        </Fragment>
      </CardActions>
    </Card>
  );
};
export default ProjectReportCard;
