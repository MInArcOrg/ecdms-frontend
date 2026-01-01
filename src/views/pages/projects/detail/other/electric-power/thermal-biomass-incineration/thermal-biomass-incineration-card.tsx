'use client';

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ThermalBiomassIncinerationData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ThermalBiomassIncinerationCardProps {
  thermalBiomassIncinerationData: ThermalBiomassIncinerationData;
  refetch: () => void;
  onEdit: (data: ThermalBiomassIncinerationData) => void;
  onDelete: (id: string) => void;
  onDetail: (data: ThermalBiomassIncinerationData) => void;
  thermalTypeMap: Map<string, string>;
  fuelSourceMap: Map<string, string>;
}

const ThermalBiomassIncinerationCard: React.FC<ThermalBiomassIncinerationCardProps> = ({
  thermalBiomassIncinerationData,
  onDetail,
  thermalTypeMap,
  fuelSourceMap
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
              onClick={() => onDetail(thermalBiomassIncinerationData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {thermalTypeMap.get(thermalBiomassIncinerationData.type_id) || thermalBiomassIncinerationData.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.thermal-biomass-incineration.form.type')}:{' '}
              {thermalTypeMap.get(thermalBiomassIncinerationData.type_id) || 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.thermal-biomass-incineration.form.fuel-source')}:{' '}
              {fuelSourceMap.get(thermalBiomassIncinerationData.fuel_source_id) || 'N/A'}
            </Typography>
          </Grid>

          {thermalBiomassIncinerationData.heat_rate_at_max_capacity !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.thermal-biomass-incineration.form.heat-rate-at-max-capacity')}:{' '}
                {thermalBiomassIncinerationData.heat_rate_at_max_capacity}
              </Typography>
            </Grid>
          )}

          {thermalBiomassIncinerationData.remark && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.thermal-biomass-incineration.form.remark')}: {thermalBiomassIncinerationData.remark}
              </Typography>
            </Grid>
          )}

          {thermalBiomassIncinerationData.created_at && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" mt={2}>
                {t('common.table-columns.created-at')}: {formatCreatedAt(thermalBiomassIncinerationData.created_at)}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ThermalBiomassIncinerationCard;
