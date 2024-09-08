import { Box, Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import StakeholderInfoDrawer from './stakeholder-info-drawer';
import stakeholderInfoApiService from 'src/services/stakeholders/stakeholder-info-service';
import { StakeholderInfo } from './stakeholder-info-form';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import Icon from 'src/@core/components/icon';

interface StakeholderInfoDetailComponentProps {
  stakeholderInfo: StakeholderInfo;
  refetch: () => void;
  typeId: string;
}

const StakeholderInfoDetailComponent: React.FC<StakeholderInfoDetailComponentProps> = ({ stakeholderInfo, refetch, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const handleEdit = () => {
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleDelete = async (resourceId: string) => {
    await stakeholderInfoApiService.delete(resourceId);
    refetch();
  };
  if (!stakeholderInfo)
    return (
      <Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row-reverse',
            p: 1,
            m: 1,
            borderRadius: 1,
          }}
        >
          <></>
          <IconButton color="primary" onClick={toggleDrawer}>
            <Icon icon="tabler:plus" fontSize={20} />
          </IconButton>
        </Box>
        <CardContent>
          <Typography variant="body1">{t('No stakeholder information available')}</Typography>

        </CardContent>

        {showDrawer && (
          <StakeholderInfoDrawer
            open={showDrawer}
            toggle={toggleDrawer}
            stakeholderInfo={stakeholderInfo as StakeholderInfo}
            refetch={refetch}
            typeId={String(typeId)}
          />
        )}
      </Card>
    );

  return (
    <Fragment>
      {showDrawer && (
        <StakeholderInfoDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderInfo={stakeholderInfo}
          refetch={refetch}
          typeId={String(typeId)}
        />
      )}

      <Card>
        <CardContent>
          {/* Optional fields from the StakeholderInfo interface */}
          <Box sx={{ display: { md: 'flex' } }} alignItems="start" justifyContent="space-between" mt={3}>
            {stakeholderInfo.capital && (
              <Typography variant="body1">
                <strong>{t('Capital')}:</strong> {stakeholderInfo.capital}
              </Typography>
            )}
            {stakeholderInfo.general_manager && (
              <Typography variant="body1">
                <strong>{t('General Manager')}:</strong> {stakeholderInfo.general_manager}
              </Typography>
            )}
          </Box>

          {stakeholderInfo.description && (
            <Box mt={3}>
              <Typography variant="body1">
                <strong>{t('Description')}:</strong> {stakeholderInfo.description}
              </Typography>
            </Box>
          )}
        </CardContent>

        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Box>
            <FileDrawer id={stakeholderInfo.id} type={uploadableStakeholderFileTypes.stakeholderInfo} /> &nbsp;
            <Box sx={{ display: 'flex' }}>
              <ModelActionComponent
                model="StakeholderInfo"
                model_id={stakeholderInfo.id}
                refetchModel={refetch}
                resubmit={() => { }}
                title=""
                postAction={() => { }}
              />
              <RowOptions
                onEdit={handleEdit}
                onDelete={() => handleDelete(stakeholderInfo.id)}
                item={stakeholderInfo}
                deletePermissionRule={{
                  action: 'delete',
                  subject: 'stakeholderinfo',
                }}
                editPermissionRule={{
                  action: 'edit',
                  subject: 'stakeholderinfo',
                }}
                options={[]}
              />
            </Box>
          </Box>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default StakeholderInfoDetailComponent;
