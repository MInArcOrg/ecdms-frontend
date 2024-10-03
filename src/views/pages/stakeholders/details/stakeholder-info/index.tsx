import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Icon from 'src/@core/components/icon';
import stakeholderInfoApiService from 'src/services/stakeholder/stakeholder-info-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import StakeholderInfoDrawer from './stakeholder-info-drawer';
import { StakeholderInfo } from './stakeholder-info-form';
import { formatCurrency } from 'src/utils/formatter/currency';

interface StakeholderInfoDetailComponentProps {
  stakeholderInfo: StakeholderInfo;
  refetch: () => void;
  stakeholder_id: string;
}

const StakeholderInfoDetailComponent: React.FC<StakeholderInfoDetailComponentProps> = ({ stakeholderInfo, refetch, stakeholder_id }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const handleEdit = () => {
    toggleDrawer();
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleDelete = async (stakeholderInfoId: string) => {
    await stakeholderInfoApiService.delete(stakeholderInfoId);
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
            borderRadius: 1
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
            stakeholder_id={String(stakeholder_id)}
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
          stakeholder_id={String(stakeholder_id)}
        />
      )}

      <Card>
        <CardContent>
          {/* Optional fields from the StakeholderInfo interface */}
          <Box sx={{ display: { md: 'flex' } }} alignItems="start" justifyContent="space-between" mt={3}>
            {stakeholderInfo.capital && (
              <Typography variant="body1">
                <strong>{t('stakeholder.stakeholder-info.form.capital')}:</strong> {formatCurrency(Number(stakeholderInfo.capital))}
              </Typography>
            )}
            {stakeholderInfo.general_manager && (
              <Typography variant="body1">
                <strong>{t('stakeholder.stakeholder-info.form.general-manager')}:</strong> {stakeholderInfo.general_manager}
              </Typography>
            )}
          </Box>

          {stakeholderInfo.description && (
            <Box mt={3}>
              <Typography variant="body1">
                <strong>{t('stakeholder.stakeholder-info.form.description')}:</strong> {stakeholderInfo.description}
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
                resubmit={() => {}}
                title=""
                postAction={() => {}}
              />
              <RowOptions
                onEdit={handleEdit}
                onDelete={() => handleDelete(stakeholderInfo.id)}
                item={stakeholderInfo}
                deletePermissionRule={{
                  action: 'delete',
                  subject: 'stakeholderinfo'
                }}
                editPermissionRule={{
                  action: 'edit',
                  subject: 'stakeholderinfo'
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
