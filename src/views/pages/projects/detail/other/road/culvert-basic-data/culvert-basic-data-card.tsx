'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { CulvertBasicData } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CulvertBasicDataCardProps {
  culvertBasicData: CulvertBasicData;
  refetch: () => void;
  onEdit: (culvertBasicData: CulvertBasicData) => void;
  onDelete: (id: string) => void;
  onDetail: (culvertBasicData: CulvertBasicData) => void;
}

const CulvertBasicDataCard: React.FC<CulvertBasicDataCardProps> = ({ culvertBasicData, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(culvertBasicData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {culvertBasicData?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-basic-data.details.name')}: {culvertBasicData?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-basic-data.details.culvert-name')}: {culvertBasicData?.culvert_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-basic-data.details.culvert-number')}: {culvertBasicData?.culvert_number || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-basic-data.details.area-topography-id')}: {culvertBasicData?.area_topography_id || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="CulvertBasicData"
          model_id={culvertBasicData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'culvertbasicdata'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertbasicdata'
          }}
          onEdit={() => onEdit(culvertBasicData)}
          onDelete={() => onDelete(culvertBasicData.id)}
          item={culvertBasicData}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default CulvertBasicDataCard;
