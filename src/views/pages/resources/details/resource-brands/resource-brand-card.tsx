import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';
import { useAuthenticatedImage, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import { ResourceBrand } from 'src/types/resource';

interface ResourceBrandCardProps {
  resourceBrand: ResourceBrand;
  onEdit: (category: ResourceBrand) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
  children: ReactElement;
}

const ResourceBrandCard: React.FC<ResourceBrandCardProps> = ({ resourceBrand, onEdit, onDelete, refetch, t, children }) => {
  const { data: brandPhoto } = useGetMultiplePhotos({
    filter: {
      model_id: resourceBrand.id,
      type: 'RESOURCE_BRAND'
    }
  });

  const photoUrl = brandPhoto?.payload?.[0]?.url;
  const authenticatedSrc = useAuthenticatedImage(photoUrl);

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={resourceBrand.name} />
            {authenticatedSrc && (
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src={authenticatedSrc}
                  alt={resourceBrand.name || 'Brand Image'}
                  style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: '8px' }}
                />
              </Box>
            )}
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={resourceBrand.description} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-brand.form.datasource')}:</strong> {resourceBrand.datasource}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceBrand.id} type="" />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceBrand"
              model_id={resourceBrand.id}
              refetchModel={refetch}
              resubmit={() => { }}
              title=""
              postAction={() => { }}
            />
            <RowOptions 
            deletePermissionRule={{
              action:"delete",
              subject:"resourcebrand"
            }}
            editPermissionRule={{
              action:"update",
              subject:"resourcebrand"
            }}
            onEdit={onEdit} onDelete={() => onDelete(resourceBrand.id)} item={resourceBrand} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceBrandCard;
