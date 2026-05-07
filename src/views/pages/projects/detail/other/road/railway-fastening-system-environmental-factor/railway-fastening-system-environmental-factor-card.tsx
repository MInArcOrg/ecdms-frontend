import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemEnvironmentalFactor } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer'; // Assuming this is your FileDrawer component for display
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES } from './filet-type-config';

interface RailwayFasteningSystemEnvironmentalFactorCardProps {
  railwayFasteningSystemEnvironmentalFactor: RailwayFasteningSystemEnvironmentalFactor;
  refetch: () => void;
  onEdit: (environmentalFactor: RailwayFasteningSystemEnvironmentalFactor) => void;
  onDelete: (id: string) => void;
  onDetail: (environmentalFactor: RailwayFasteningSystemEnvironmentalFactor) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemEnvironmentalFactorCard: React.FC<RailwayFasteningSystemEnvironmentalFactorCardProps> = ({
  railwayFasteningSystemEnvironmentalFactor,
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
              onClick={() => onDetail(railwayFasteningSystemEnvironmentalFactor)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayFasteningSystemEnvironmentalFactor?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name')}:{' '}
            {railwayFasteningSystemEnvironmentalFactor.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures')}:{' '}
            {railwayFasteningSystemEnvironmentalFactor.environmental_compliance_measures || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment')}:{' '}
            {railwayFasteningSystemEnvironmentalFactor.environmental_impact_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-environmental-factor.details.remark')}:{' '}
            {railwayFasteningSystemEnvironmentalFactor.remark || 'N/A'}
          </Typography>
          {railwayFasteningSystemEnvironmentalFactor.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayFasteningSystemEnvironmentalFactor.created_at}
            </Typography>
          )}
          {railwayFasteningSystemEnvironmentalFactor.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayFasteningSystemEnvironmentalFactor.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        {railwayFasteningSystemEnvironmentalFactor.id &&
          RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES.map((fileType) => {
            const resolvedType = fileType.key === 'defaultFiles' ? otherSubMenu?.fileType || fileType.type : fileType.type;
            return (
              <Box key={fileType.key} width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="subtitle2" fontWeight="medium">
                  {t(fileType.titleTKey)}:
                </Typography>
                <FileDrawer id={railwayFasteningSystemEnvironmentalFactor.id} type={resolvedType} />
              </Box>
            );
          })}

        <Box width="100%" display="flex" justifyContent="flex-end" mt={1}>
          {railwayFasteningSystemEnvironmentalFactor.id && (
            <ModelAction
              model="RailwayFasteningSystemEnvironmentalFactor"
              model_id={railwayFasteningSystemEnvironmentalFactor.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayfasteningsystemenvironmentalFactor'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayfasteningsystemenvironmentalFactor'
            }}
            onEdit={() => onEdit(railwayFasteningSystemEnvironmentalFactor)}
            onDelete={() => onDelete(railwayFasteningSystemEnvironmentalFactor.id as string)}
            item={railwayFasteningSystemEnvironmentalFactor}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default RailwayFasteningSystemEnvironmentalFactorCard;
