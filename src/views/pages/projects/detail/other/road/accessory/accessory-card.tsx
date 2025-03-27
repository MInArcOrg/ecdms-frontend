'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { Accessory } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface AccessoryCardProps {
  accessory: Accessory;
  refetch: () => void;
  onEdit: (accessory: Accessory) => void;
  onDelete: (id: string) => void;
  onDetail: (accessory: Accessory) => void;
}

const AccessoryCard: React.FC<AccessoryCardProps> = ({ accessory, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(accessory)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {accessory?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.accessory.details.name')}: {accessory?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.accessory.details.under-passes')}: {accessory?.under_passes || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.accessory.details.ramps')}: {accessory?.ramps || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.accessory.details.bridge')}: {accessory?.bridge ? t('common.yes') : t('common.no')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="Accessory"
          model_id={accessory.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'accessory'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'accessory'
          }}
          onEdit={() => onEdit(accessory)}
          onDelete={() => onDelete(accessory.id)}
          item={accessory}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default AccessoryCard;
