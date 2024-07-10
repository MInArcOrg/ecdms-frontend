import { Box, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import DescCollapse from '../desc-collapse';
import { DetailResourceType } from 'src/types/resource';

interface DetailResourceTypeCardProps {
  detailResourceType: DetailResourceType;
  onEdit: (category: DetailResourceType) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
  children: ReactElement;
}

const DetailResourceTypeCard: React.FC<DetailResourceTypeCardProps> = ({ detailResourceType, onEdit, onDelete, refetch, t, children }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardHeader title={detailResourceType.title} />
            <Box mt={2}>
              <Typography variant="body1" component="div">
                <DescCollapse desc={detailResourceType.description} />
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography variant="subtitle1">
                <strong>{t('resource.detail-resource-type.form.datasource')}:</strong> {detailResourceType.datasource}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box>
          <FileDrawer id={detailResourceType.id} type="" />
          <Box display="flex" alignItems="end">
            <ModelActionComponent
              model="DetailResourceType"
              model_id={detailResourceType.id}
              refetchModel={refetch}
              resubmit={() => {}}
              title=""
              postAction={() => {}}
            />
            <RowOptions onEdit={onEdit} onDelete={() => onDelete(detailResourceType.id)} item={detailResourceType} options={[]} />
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default DetailResourceTypeCard;
