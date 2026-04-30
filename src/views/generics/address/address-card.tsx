import { Box, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useQueries } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import addressmasterApiService from 'src/services/admin/address-master-service';
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
  const isUuid = (value?: string) =>
    typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

  const addressIds = [
    address.country,
    address.region,
    address.city_administration,
    address.zone,
    address.city,
    address.subcity,
    address.sub_city,
    address.woreda,
    address.kebele
  ].filter((v): v is string => Boolean(v) && isUuid(v));

  const addressMasterResults = useQueries({
    queries: addressIds.map((id) => ({
      queryKey: ['address-master-data', id],
      queryFn: () => addressmasterApiService.getOne(id, {}),
      enabled: isUuid(id),
      staleTime: 10 * 60 * 1000
    }))
  });

  const addressTitleById = new Map<string, string>(
    addressIds
      .map((id, idx) => [id, addressMasterResults[idx]?.data?.payload?.title] as const)
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1]))
  );

  const resolveTitle = (value?: string) => {
    if (!value) return '';
    return addressTitleById.get(value) || value;
  };

  const addressLine = [
    resolveTitle(address.country),
    resolveTitle(address.region),
    resolveTitle(address.city_administration),
    resolveTitle(address.zone),
    resolveTitle(address.city),
    resolveTitle(address.subcity || address.sub_city),
    resolveTitle(address.woreda),
    (address.kebele || '').toString(),
    address.street || '',
    address.house_number || '',
    address.block_number || ''
  ]
    .map((v) => (typeof v === 'string' ? v.trim() : String(v)))
    .filter((v) => v.length > 0)
    .join(', ');

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">{transl(`address.${type}-address`)}</Typography>
              </Box>
              <Box mt={3}>
                <MapView position={[address.northing, address.easting]} />
              </Box>
              <Box mt={3} display="flex" gap={3}>
                <Typography variant="body1">
                  <strong>{transl('address.title')}:</strong> {addressLine || transl('common.not-available')}
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
                        action: 'update',
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
