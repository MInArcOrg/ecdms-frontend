import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ResourceQuantityPrice } from 'src/types/resource';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ResourceQuantityPriceCardProps {
  resourceQuantityPrice: ResourceQuantityPrice;
  onEdit: (category: ResourceQuantityPrice) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}

const ResourceQuantityPriceCard: React.FC<ResourceQuantityPriceCardProps> = ({ resourceQuantityPrice, onEdit, onDelete, refetch, t }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box alignItems="center">
              <Box>
                <Typography variant="subtitle1">
                  <strong>{t('resource.resource-quantity-price.form.brand')}:</strong> {resourceQuantityPrice.resourcebrand?.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <strong>{t('resource.resource-quantity-price.form.type')}:</strong> {resourceQuantityPrice.detailresourcetype?.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <strong>{t('resource.resource-quantity-price.form.unit-price')}:</strong>{' '}
                  {formatCurrency(resourceQuantityPrice.unit_price)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <strong>{t('resource.resource-quantity-price.form.quantity')}:</strong> {resourceQuantityPrice.quantity}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1">
                  <strong>{t('resource.resource-quantity-price.form.store-address')}:</strong> {resourceQuantityPrice.store_address}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={resourceQuantityPrice.id} type={uploadableResourceFileTypes.resourceQuantityPrice} />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="ResourceQuantityAndPrice"
              model_id={resourceQuantityPrice.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(resourceQuantityPrice.id)} item={resourceQuantityPrice} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ResourceQuantityPriceCard;
