import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySleeperFasteningSystem } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySleeperFasteningSystemCardProps {
  railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem;
  refetch: () => void;
  onEdit: (railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem) => void;
  onDelete: (id: string) => void;
  onDetail: (railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem) => void;
}

const RailwaySleeperFasteningSystemCard: React.FC<RailwaySleeperFasteningSystemCardProps> = ({
  railwaySleeperFasteningSystem,
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
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySleeperFasteningSystem)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySleeperFasteningSystem?.project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-fastening-system.details.railway_line_section_name')}:{' '}
            {railwaySleeperFasteningSystem.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-fastening-system.details.used_fastening_systems_type')}:{' '}
            {railwaySleeperFasteningSystem.used_fastening_systems_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-fastening-system.details.fastener_condition_assessment')}:{' '}
            {railwaySleeperFasteningSystem.fastener_condition_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-fastening-system.details.remark')}:{' '}
            {railwaySleeperFasteningSystem.remark || 'N/A'}
          </Typography>
          {railwaySleeperFasteningSystem.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySleeperFasteningSystem.created_at}
            </Typography>
          )}
          {railwaySleeperFasteningSystem.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySleeperFasteningSystem.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySleeperFasteningSystem"
          model_id={railwaySleeperFasteningSystem.project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysleeperfasteningsystem'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysleeperfasteningsystem'
          }}
          onEdit={() => onEdit(railwaySleeperFasteningSystem)}
          onDelete={() => onDelete(railwaySleeperFasteningSystem.project_id)}
          item={railwaySleeperFasteningSystem}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySleeperFasteningSystemCard;