import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { TurbineInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TurbineInfoCardProps {
  turbineInfo: TurbineInfo;
  refetch: () => void;
  onEdit: (turbineInfo: TurbineInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (turbineInfo: TurbineInfo) => void;
}

const TurbineInfoCard: React.FC<TurbineInfoCardProps> = ({ turbineInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(turbineInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {turbineInfo?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.name')}: {turbineInfo?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.turbine-type')}: {turbineInfo?.turbine_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.generating-capacity')}: {turbineInfo?.generating_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.designed-quantity')}: {turbineInfo?.designed_quantity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.installed-quantity')}: {turbineInfo?.installed_quantity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.turbine-info.details.functional-quantity')}: {turbineInfo?.functional_quantity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {turbineInfo?.created_at ? formatCreatedAt(turbineInfo.created_at) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}: {turbineInfo?.updated_at ? formatCreatedAt(turbineInfo.updated_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={turbineInfo.id} type={uploadableProjectFileTypes.other.turbineInfo} />
        <ModelAction
          model="TurbineInfo"
          model_id={turbineInfo.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(turbineInfo)}
          onDelete={() => onDelete(turbineInfo.id)}
          deletePermissionRule={{
            action: 'delete',
            subject: 'turbineinfo'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'turbineinfo'
          }}
          item={turbineInfo}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default TurbineInfoCard;
