// components/GeneralMasterResourceList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { GeneralMasterResource } from 'src/types/general/general-master';
import { capitalizeEveryLetterWithDash, changeToPascalCase } from 'src/utils/string';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const GeneralMasterResourceCard = ({
  type,
  generalMaster,
  onEdit,
  onDelete,
  refetch
}: {
  type: string;
  generalMaster: GeneralMasterResource;
  onEdit: (category: GeneralMasterResource) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  return (
    <Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant="h5" component="div">
                  {generalMaster.service_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {generalMaster.specification_detail}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <FileDrawer id={generalMaster.id} type={`${capitalizeEveryLetterWithDash(type)}_type`} /> &nbsp;
                <ModelActionComponent
                  model={changeToPascalCase(type)}
                  model_id={generalMaster.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions onEdit={onEdit} onDelete={() => onDelete(generalMaster.id)} item={generalMaster} options={[]} />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Fragment>
  );
};
export default GeneralMasterResourceCard;
