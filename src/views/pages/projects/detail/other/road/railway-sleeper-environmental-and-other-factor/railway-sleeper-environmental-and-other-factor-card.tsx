import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySleeperEnvironmentalAndOtherFactor } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySleeperEnvironmentalAndOtherFactorCardProps {
  railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor;
  refetch: () => void;
  onEdit: (railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor) => void;
  onDelete: (id: string) => void;
  onDetail: (railwaySleeperEnvironmentalAndOtherFactor: RailwaySleeperEnvironmentalAndOtherFactor) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySleeperEnvironmentalAndOtherFactorCard: React.FC<RailwaySleeperEnvironmentalAndOtherFactorCardProps> = ({
  railwaySleeperEnvironmentalAndOtherFactor,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu
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
              onClick={() => onDetail(railwaySleeperEnvironmentalAndOtherFactor)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySleeperEnvironmentalAndOtherFactor?.project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-environmental-and-other-factor.details.railway_line_section_name')}:{' '}
            {railwaySleeperEnvironmentalAndOtherFactor.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_compliance_measures')}:{' '}
            {railwaySleeperEnvironmentalAndOtherFactor.environmental_compliance_measures || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_impact_assessment')}:{' '}
            {railwaySleeperEnvironmentalAndOtherFactor.environmental_impact_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-environmental-and-other-factor.details.remark')}:{' '}
            {railwaySleeperEnvironmentalAndOtherFactor.remark || 'N/A'}
          </Typography>
          {railwaySleeperEnvironmentalAndOtherFactor.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySleeperEnvironmentalAndOtherFactor.created_at}
            </Typography>
          )}
          {railwaySleeperEnvironmentalAndOtherFactor.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySleeperEnvironmentalAndOtherFactor.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={railwaySleeperEnvironmentalAndOtherFactor?.id || ''} type={otherSubMenu?.fileType || ''} />

        <ModelAction
          model="RailwaySleeperEnvironmentalAndOtherFactor"
          model_id={railwaySleeperEnvironmentalAndOtherFactor.project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysleeperenvironmentalandotherfactor'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysleeperenvironmentalandotherfactor'
          }}
          onEdit={() => onEdit(railwaySleeperEnvironmentalAndOtherFactor)}
          onDelete={() => onDelete(railwaySleeperEnvironmentalAndOtherFactor.project_id)}
          item={railwaySleeperEnvironmentalAndOtherFactor}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySleeperEnvironmentalAndOtherFactorCard;