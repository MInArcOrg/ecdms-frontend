import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-utils';
import { ResourceQuantity } from 'src/types/resource';
import { formatDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ResourceQuantityCardProps {
  resourceQuantity: ResourceQuantity;
  onEdit: (item: ResourceQuantity) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceQuantityCard: React.FC<ResourceQuantityCardProps> = ({ resourceQuantity, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-quantity.form.supplier-name')}:</strong> {(resourceQuantity as any).supplier_name?.title || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-quantity.form.brand')}:</strong> {(resourceQuantity as any).resource_brand?.name || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-quantity.form.specification')}:</strong> {(resourceQuantity as any).resource_specification?.title || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-quantity.form.total-quantity-available')}:</strong> {resourceQuantity.total_quantity_available || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-quantity.form.price-date')}:</strong> {formatDate(resourceQuantity.price_date) || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <FileDrawer id={resourceQuantity.id || ''} type={uploadableResourceFileTypes.resourceType} />
          <ModelActionComponent
            model="ResourceQuantity"
            model_id={resourceQuantity.id || ''}
            refetchModel={refetch}
            resubmit={() => { }}
            title=""
            postAction={() => { }}
          />
          <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceQuantity.id || '')} item={resourceQuantity} options={[]}
            editPermissionRule={
              {
                subject: 'resourcequantity',
                action: 'update'
              }
            }
            deletePermissionRule={
              {
                subject: 'resourcequantity',
                action: 'delete'
              }
            }
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceQuantityCard;
