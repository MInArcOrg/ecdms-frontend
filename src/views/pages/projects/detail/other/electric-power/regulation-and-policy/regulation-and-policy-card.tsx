'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { RegulationAndPolicy } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface RegulationAndPolicyCardProps {
  regulationAndPolicy: RegulationAndPolicy;
  refetch: () => void;
  onEdit: (regulationAndPolicy: RegulationAndPolicy) => void;
  onDelete: (id: string) => void;
  onDetail: (regulationAndPolicy: RegulationAndPolicy) => void;
}

const RegulationAndPolicyCard: React.FC<RegulationAndPolicyCardProps> = ({ regulationAndPolicy, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(regulationAndPolicy)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {regulationAndPolicy?.regulatory_body_overseeing_the_facility || regulationAndPolicy?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.regulation-and-policy.details.regulatory-compliance-monitoring')}:{' '}
              {regulationAndPolicy?.regulatory_compliance_monitoring ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.regulation-and-policy.details.environmental-and-social-regulation-compliance-monitoring')}:{' '}
              {regulationAndPolicy?.environmental_and_social_regulation_compliance_monitoring ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.regulation-and-policy.details.licensing-and-permit-requirements')}:{' '}
              {regulationAndPolicy?.licensing_and_permit_requirements ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>
        </Grid>

        {regulationAndPolicy?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.regulation-and-policy.details.remark')}: {regulationAndPolicy.remark}
            </Typography>
          </Box>
        )}

        {regulationAndPolicy?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(regulationAndPolicy.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={regulationAndPolicy.id} type={uploadableProjectFileTypes.other.regulationAndPolicy} />

        <Box display="flex">
          <ModelAction
            model="RegulationAndPolicy"
            model_id={regulationAndPolicy.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'regulationandpolicy'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'regulationandpolicy'
            }}
            onEdit={() => onEdit(regulationAndPolicy)}
            onDelete={() => onDelete(regulationAndPolicy.id)}
            item={regulationAndPolicy}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default RegulationAndPolicyCard;
