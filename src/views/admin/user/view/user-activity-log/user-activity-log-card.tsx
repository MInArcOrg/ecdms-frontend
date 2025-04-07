import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { UserActivityLog } from 'src/types/admin/user';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface UserUserActivityLogCardProps {
  userActivityLog: UserActivityLog;
  refetch: () => void;
}

const UserUserActivityLogCard: React.FC<UserUserActivityLogCardProps> = ({ userActivityLog, refetch }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            {userActivityLog.action || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatCreatedAt(userActivityLog.created_at)}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('department.user.activity-log.module')}: {userActivityLog.module || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('department.user.activity-log.target-type')}: {userActivityLog.target_type || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('department.user.activity-log.target-id')}: {userActivityLog.target_id || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('department.user.activity-log.ip-address')}: {userActivityLog.ip_address || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('department.user.activity-log.user-agent')}: {userActivityLog.user_agent || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="UserActivityLog"
          model_id={userActivityLog?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'useractivitylog'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'useractivitylog'
          }}
          item={userActivityLog}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default UserUserActivityLogCard;
