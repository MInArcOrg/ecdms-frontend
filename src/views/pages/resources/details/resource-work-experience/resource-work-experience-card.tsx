import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ResourceWorkExperience } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';

interface ResourceWorkExperienceCardProps {
  resourceWorkExperience: ResourceWorkExperience;
  onEdit: (category: ResourceWorkExperience) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceWorkExperienceCard: React.FC<ResourceWorkExperienceCardProps> = ({
  resourceWorkExperience,
  onEdit,
  onDelete,
  refetch,
  t
}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceWorkExperience?.workexperience?.title} />
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={resourceWorkExperience.description} />
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-study-field.form.description')}:</strong> {resourceWorkExperience.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceWorkExperience.id} type={uploadableResourceFileTypes.resourceWorkExperience} />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceWorkExperience"
              model_id={resourceWorkExperience.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceWorkExperience.id)} item={resourceWorkExperience} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceWorkExperienceCard;
