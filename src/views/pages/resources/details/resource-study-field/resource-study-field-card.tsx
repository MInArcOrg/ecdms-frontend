import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ResourceStudyField } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';

interface ResourceStudyFieldCardProps {
  resourceStudyField: ResourceStudyField;
  onEdit: (category: ResourceStudyField) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceStudyFieldCard: React.FC<ResourceStudyFieldCardProps> = ({ resourceStudyField, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceStudyField?.studyfield?.title} />
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={resourceStudyField.description} />
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-study-field.form.description')}:</strong> {resourceStudyField.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceStudyField.id} type={uploadableResourceFileTypes.resourceStudyField} />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceStudyField"
              model_id={resourceStudyField.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceStudyField.id)} item={resourceStudyField} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceStudyFieldCard;
