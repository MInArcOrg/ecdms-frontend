import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface AdditionalInfoCardProps {
  additionalInfo: ProjectAdditionalInfo;
  refetch: () => void;
  onEdit: (additionalInfo: ProjectAdditionalInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (additionalInfo: ProjectAdditionalInfo) => void;
}

const AdditionalInfoCard: React.FC<AdditionalInfoCardProps> = ({ additionalInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(additionalInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {additionalInfo?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}> 
          <Typography variant="body2" color="text.secondary">
            {t('project.additional-info.status')}: {additionalInfo?.project_status || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.additional-info.accidents')}: {additionalInfo?.work_accident_number?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.additional-info.reason')}: {additionalInfo?.reason || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={additionalInfo.id} type={uploadableProjectFileTypes.project} />
        <ModelAction
          model="ProjectAdditionalInfo"
          model_id={additionalInfo.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'additionalinfo'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'additionalinfo'
          }}
          onEdit={() => onEdit(additionalInfo)}
          onDelete={() => onDelete(additionalInfo.id)}
          item={additionalInfo}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default AdditionalInfoCard;