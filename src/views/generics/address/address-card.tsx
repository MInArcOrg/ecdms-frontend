import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import Address from 'src/types/general/address';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const MapView = dynamic(() => import('src/views/components/custom/map-view'), {
  ssr: false
});

const AddressCard = ({
  address,
  onDetail,
  onEdit,
  onDelete,
  refetch,
  transl,
  type
}: {
  address: Address;
  onDetail: (address: Address) => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  transl: any;
  refetch: () => void;
  type: string;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{transl(`commmon.address.${type}-location`)}</Typography>
              </Box>
              <Box mt={3}>
                <MapView position={[address.northing, address.easting]} />
              </Box>
              <Box mt={3} display="flex" gap={3}>
                <Typography variant="body1">
                  <strong>{transl('address.title')}:</strong> {address.country}, {address.city}, {address.region}, {address.subcity},{' '}
                  {address.street}, {address.block_number}, {address.house_number}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <FileDrawer id={address.id} type={'RESOURCE'} /> &nbsp;
                  <Box sx={{ display: 'flex' }}>
                    <ModelActionComponent
                      model="Address"
                      model_id={address.id}
                      refetchModel={refetch}
                      resubmit={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                      title={''}
                      postAction={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                    <RowOptions
                      onEdit={onEdit}
                      onDelete={() => onDelete(address.id)}
                      deletePermissionRule={{
                        action: 'delete',
                        subject: 'address'
                      }}
                      editPermissionRule={{
                        action: 'edit',
                        subject: 'address'
                      }}
                      item={address}
                      options={[]}
                    />
                  </Box>
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default AddressCard;
