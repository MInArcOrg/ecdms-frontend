// components/StakeholderGeneralMasterList.tsx
import { Box, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { StakeholderMasterModel } from 'src/constants/master-data/stakeholder-general-master-constants';
import { StakeholderGeneralMaster } from 'src/types/general/general-master';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const StakeholderGeneralMasterCard = ({
  stakeholderMasterModel,
  stakeholderGeneralMaster,
  onEdit,
  onDelete,
  refetch
}: {
  stakeholderMasterModel: StakeholderMasterModel;
  stakeholderGeneralMaster: StakeholderGeneralMaster;
  onEdit: (category: StakeholderGeneralMaster) => void;
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
                  {stakeholderGeneralMaster.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stakeholderGeneralMaster.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <FileDrawer id={stakeholderGeneralMaster.id} type={stakeholderMasterModel.fileType} /> &nbsp;
                <ModelActionComponent
                  model={'stakeholdermasterdata'}
                  model_id={stakeholderGeneralMaster.id}
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
                  onDelete={() => onDelete(stakeholderGeneralMaster.id)}
                  item={stakeholderGeneralMaster}
                  options={[]}
                  deletePermissionRule={{
                    action: 'delete',
                    subject: 'stakeholdermasterdata'
                  }}
                  editPermissionRule={{
                    action: 'update',
                    subject: 'stakeholdermasterdata'
                  }}
                />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Fragment>
  );
};
export default StakeholderGeneralMasterCard;
