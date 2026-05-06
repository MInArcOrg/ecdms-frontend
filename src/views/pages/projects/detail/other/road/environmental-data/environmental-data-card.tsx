'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { EnvironmentalData } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import { ENVIRONMENTAL_DATA_FILE_TYPES } from './filet-type-config';

interface EnvironmentalDataCardProps {
  environmentalData: EnvironmentalData;
  refetch: () => void;
  onEdit: (environmentalData: EnvironmentalData) => void;
  onDelete: (id: string) => void;
  onDetail: (environmentalData: EnvironmentalData) => void;
}

const EnvironmentalDataCard: React.FC<EnvironmentalDataCardProps> = ({ environmentalData, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(environmentalData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {environmentalData?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.environmental-data.details.remark')}: {environmentalData?.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {environmentalData?.created_at ? formatCreatedAt(environmentalData.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        {ENVIRONMENTAL_DATA_FILE_TYPES.map((fileType) => (
          <Box key={fileType.key} width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle2" fontWeight="medium">
              {t(fileType.titleTKey)}:
            </Typography>
            <FileDrawer id={environmentalData.id} type={fileType.type} />
          </Box>
        ))}

        <Box width="100%" display="flex" justifyContent="flex-end" mt={1}>
          <ModelAction
            model="EnvironmentalData"
            model_id={environmentalData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'environmentaldata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'environmentaldata'
            }}
            onEdit={() => onEdit(environmentalData)}
            onDelete={() => onDelete(environmentalData.id)}
            item={environmentalData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default EnvironmentalDataCard;
