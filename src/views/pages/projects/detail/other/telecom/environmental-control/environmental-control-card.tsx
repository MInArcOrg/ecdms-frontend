import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { EnvironmentalControl } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface EnvironmentalControlCardProps {
  environmentalControl: EnvironmentalControl;
  refetch: () => void;
  onEdit: (environmentalControl: EnvironmentalControl) => void;
  onDelete: (id: string) => void;
  onDetail: (environmentalControl: EnvironmentalControl) => void;
}

const EnvironmentalControlCard: React.FC<EnvironmentalControlCardProps> = ({
  environmentalControl,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(environmentalControl)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {environmentalControl?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-control.details.data-center-id')}:{' '}
            {environmentalControl?.dataCenter?.name || environmentalControl?.data_center_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-control.details.temperature')}: {environmentalControl?.temperature || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-control.details.humidity')}: {environmentalControl?.humidity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-control.details.air-quality')}: {environmentalControl?.air_quality || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-control.details.others')}: {environmentalControl?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={environmentalControl.id} type={uploadableProjectFileTypes.other.environmentalControl} />
        <ModelAction
          model="EnvironmentalControl"
          model_id={environmentalControl.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'environmentalcontrol'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'environmentalcontrol'
          }}
          onEdit={() => onEdit(environmentalControl)}
          onDelete={() => onDelete(environmentalControl.id)}
          item={environmentalControl}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default EnvironmentalControlCard;
