import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ResourceSalary } from 'src/types/resource';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ResourceSalaryCardProps {
  resourceSalary: ResourceSalary;
  onEdit: (category: ResourceSalary) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceSalaryCard: React.FC<ResourceSalaryCardProps> = ({ resourceSalary, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceSalary?.salary_type} />
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-salary.form.salary_type')}:</strong> {resourceSalary.salary_type}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-salary.form.min_pay')}:</strong> {formatCurrency(resourceSalary.min_pay)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-salary.form.max_pay')}:</strong> {formatCurrency(resourceSalary.max_pay)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceSalary.id} type={uploadableResourceFileTypes.resourceSalary} />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceSalary"
              model_id={resourceSalary.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceSalary.id)} item={resourceSalary} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceSalaryCard;
