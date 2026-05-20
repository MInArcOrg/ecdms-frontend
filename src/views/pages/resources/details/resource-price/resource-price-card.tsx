import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-utils';
import { ResourcePrice } from 'src/types/resource';
import { formatDynamicDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ResourcePriceCardProps {
  resourcePrice: ResourcePrice;
  onEdit: (item: ResourcePrice) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourcePriceCard: React.FC<ResourcePriceCardProps> = ({ resourcePrice, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.supplier-name')}:</strong> {resourcePrice.supplierName?.title || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.brand')}:</strong> {resourcePrice.resourceBrand?.name || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.specification')}:</strong> {resourcePrice.resourceSpecification?.name || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.unit-price')}:</strong> {resourcePrice.unit_price || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.total-quantity-available')}:</strong> {resourcePrice.total_quantity_available || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.quality')}:</strong> {resourcePrice.quality?.title || 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.price-date')}:</strong> {resourcePrice.price_date ? formatDynamicDate(resourcePrice.price_date) : 'N/A'}
              </Typography>
              <Typography variant="subtitle1">
                <strong>{t('resource.resource-price.form.remark')}:</strong> {resourcePrice.remark || 'N/A'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <FileDrawer id={resourcePrice.id || ''} type={uploadableResourceFileTypes.resourceType} />
          <ModelActionComponent
            model="ResourcePrice"
            model_id={resourcePrice.id || ''}
            refetchModel={refetch}
            resubmit={() => { }}
            title=""
            postAction={() => { }}
          />
          <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourcePrice.id || '')} item={resourcePrice} options={[]}
            deletePermissionRule={
              {
                subject: 'resourceprice',
                action: 'delete'
              }
            }
            editPermissionRule={
              {
                subject: 'resourceprice',
                action: 'update'
              }
            }
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourcePriceCard;
