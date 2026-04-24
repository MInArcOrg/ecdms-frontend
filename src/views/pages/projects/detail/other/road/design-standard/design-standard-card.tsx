'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { DesignStandard } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DesignStandardCardProps {
  designStandard: DesignStandard;
  refetch: () => void;
  onEdit: (designStandard: DesignStandard) => void;
  onDelete: (id: string) => void;
  onDetail: (designStandard: DesignStandard) => void;
}

const DesignStandardCard: React.FC<DesignStandardCardProps> = ({ designStandard, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(designStandard)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {designStandard?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.design-standard.details.road-segment')}: {designStandard?.roadSegment?.name ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.design-standard.details.design-standard-id')}: {designStandard?.designStandard?.title ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.design-standard.details.design-life-time-years')}: {designStandard?.design_life_time_years ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.design-standard.details.segment-number')}: {designStandard?.segment_number ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="DesignStandard"
          model_id={designStandard.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'designstandard'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'designstandard'
          }}
          onEdit={() => onEdit(designStandard)}
          onDelete={() => onDelete(designStandard.id)}
          item={designStandard}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DesignStandardCard;

