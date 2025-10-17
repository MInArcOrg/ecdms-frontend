'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid, Chip } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { TelecomInfrastructureAge } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface TelecomInfrastructureAgeCardProps {
  telecomInfrastructureAge: TelecomInfrastructureAge;
  refetch: () => void;
  onEdit: (telecomInfrastructureAge: TelecomInfrastructureAge) => void;
  onDelete: (id: string) => void;
  onDetail: (telecomInfrastructureAge: TelecomInfrastructureAge) => void;
}

const TelecomInfrastructureAgeCard: React.FC<TelecomInfrastructureAgeCardProps> = ({
  telecomInfrastructureAge,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  const renderStatusChip = (value: boolean | undefined) => (
    <Chip size="small" label={value ? t('common.yes') : t('common.no')} color={value ? 'success' : 'default'} sx={{ minWidth: 70 }} />
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(telecomInfrastructureAge)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.other.telecom-infrastructure-age.infrastructure-age')} - {telecomInfrastructureAge?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.telecom-infrastructure-age.details.cables')}: {renderStatusChip(telecomInfrastructureAge?.cables)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.telecom-infrastructure-age.details.wires')}: {renderStatusChip(telecomInfrastructureAge?.wires)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.telecom-infrastructure-age.details.routers')}: {renderStatusChip(telecomInfrastructureAge?.routers)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.telecom-infrastructure-age.details.switches')}: {renderStatusChip(telecomInfrastructureAge?.switches)}
            </Typography>
          </Grid>
        </Grid>

        {telecomInfrastructureAge?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(telecomInfrastructureAge.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={telecomInfrastructureAge.id} type={uploadableProjectFileTypes.other.infrastructureAge} />

        <Box display="flex">
          <ModelAction
            model="TelecomInfrastructureAge"
            model_id={telecomInfrastructureAge.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'telecominfrastructureage'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'telecominfrastructureage'
            }}
            onEdit={() => onEdit(telecomInfrastructureAge)}
            onDelete={() => onDelete(telecomInfrastructureAge.id)}
            item={telecomInfrastructureAge}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default TelecomInfrastructureAgeCard;
