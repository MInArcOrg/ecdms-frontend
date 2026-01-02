import type React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MobileNetworkCoverage } from 'src/types/project/other';

interface MobileNetworkCoverageCardProps {
  mobileNetworkCoverage: MobileNetworkCoverage;
  onEdit: (mobileNetworkCoverage: MobileNetworkCoverage) => void;
  onDelete: (id: string) => void;
  onDetail: (mobileNetworkCoverage: MobileNetworkCoverage) => void;
  refetch: () => void;
  networkTypeMap: Map<string, string>;
  mobileNetworkMap: Map<string, string>;
}

const MobileNetworkCoverageCard: React.FC<MobileNetworkCoverageCardProps> = ({
  mobileNetworkCoverage,
  onEdit,
  onDelete,
  onDetail,
  networkTypeMap,
  mobileNetworkMap
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 1 }}>
      <CardHeader
        title={mobileNetworkMap.get(mobileNetworkCoverage.mobile_network_id) || t('common.not-available')}
        onEdit={() => onEdit(mobileNetworkCoverage)}
        onDelete={() => onDelete(mobileNetworkCoverage.id)}
        onDetail={() => onDetail(mobileNetworkCoverage)}
      />
      <Divider />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-coverage.details.network-infrastructure-type')}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {networkTypeMap.get(mobileNetworkCoverage.network_infrastructure_type_id) || t('common.not-available')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-coverage.details.total-coverage-area')}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {mobileNetworkCoverage.total_coverage_area || t('common.not-available')}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-coverage.details.coverage-population-number')}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {mobileNetworkCoverage.coverage_population_number || t('common.not-available')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MobileNetworkCoverageCard;
