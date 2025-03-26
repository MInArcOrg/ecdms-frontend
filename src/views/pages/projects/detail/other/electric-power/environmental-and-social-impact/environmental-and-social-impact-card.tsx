'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { EnvironmentalAndSocialImpact } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface EnvironmentalAndSocialImpactCardProps {
  environmentalAndSocialImpact: EnvironmentalAndSocialImpact;
  refetch: () => void;
  onEdit: (environmentalAndSocialImpact: EnvironmentalAndSocialImpact) => void;
  onDelete: (id: string) => void;
  onDetail: (environmentalAndSocialImpact: EnvironmentalAndSocialImpact) => void;
}

const EnvironmentalAndSocialImpactCard: React.FC<EnvironmentalAndSocialImpactCardProps> = ({
  environmentalAndSocialImpact,
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
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(environmentalAndSocialImpact)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.other.environmental-and-social-impact.environmental-and-social-impact-details')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.environmental-and-social-impact.details.environmental-impact-assessment-conducted')}:{' '}
              {environmentalAndSocialImpact?.environmental_impact_assessment_conducted ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.environmental-and-social-impact.details.mitigation-measures-implemented')}:{' '}
              {environmentalAndSocialImpact?.mitigation_measures_implemented ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.environmental-and-social-impact.details.social-impact-assessment-conducted')}:{' '}
              {environmentalAndSocialImpact?.social_impact_assessment_conducted ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.environmental-and-social-impact.details.resettlement-and-compensation-measures-implemented')}:{' '}
              {environmentalAndSocialImpact?.resettlement_and_compensation_measures_implemented ? t('common.yes') : t('common.no')}
            </Typography>
          </Grid>
        </Grid>

        {environmentalAndSocialImpact?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.environmental-and-social-impact.details.remark')}: {environmentalAndSocialImpact.remark}
            </Typography>
          </Box>
        )}

        {environmentalAndSocialImpact?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(environmentalAndSocialImpact.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={environmentalAndSocialImpact.id} type={uploadableProjectFileTypes.other.environmentalAndSocialImpact} />

        <Box display="flex">
          <ModelAction
            model="EnvironmentalAndSocialImpact"
            model_id={environmentalAndSocialImpact.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'environmentalandsocialimpact'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'environmentalandsocialimpact'
            }}
            onEdit={() => onEdit(environmentalAndSocialImpact)}
            onDelete={() => onDelete(environmentalAndSocialImpact.id)}
            item={environmentalAndSocialImpact}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default EnvironmentalAndSocialImpactCard;
