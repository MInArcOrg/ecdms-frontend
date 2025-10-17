import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';
import { ResourceSpecification } from 'src/types/resource';

interface ResourceSpecificationCardProps {
  resourceSpecification: ResourceSpecification;
  onEdit: (category: ResourceSpecification) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
  children: ReactElement;
}

const ResourceSpecificationCard: React.FC<ResourceSpecificationCardProps> = ({
  resourceSpecification,
  onEdit,
  onDelete,
  refetch,
  t,
  children
}) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceSpecification.title} />
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={resourceSpecification.description} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-specification.form.datasource')}:</strong> {resourceSpecification.datasource}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceSpecification.id} type="" />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceSpecification"
              model_id={resourceSpecification.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceSpecification.id)} item={resourceSpecification} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceSpecificationCard;
