import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ResourceStudyLevel } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';

interface ResourceStudyLevelCardProps {
  resourceStudyLevel: ResourceStudyLevel;
  onEdit: (category: ResourceStudyLevel) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceStudyLevelCard: React.FC<ResourceStudyLevelCardProps> = ({ resourceStudyLevel, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceStudyLevel?.studylevel?.title} />
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={resourceStudyLevel.description} />
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-study-level.form.description')}:</strong> {resourceStudyLevel.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceStudyLevel.id} type={uploadableResourceFileTypes.resourceStudyLevel} />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceStudyLevel"
              model_id={resourceStudyLevel.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceStudyLevel.id)} item={resourceStudyLevel} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceStudyLevelCard;
