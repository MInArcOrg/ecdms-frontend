// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-card.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import CustomChip from 'src/views/components/custom/custom-chip';

// Type Imports
import { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { FileTypeConfig } from './file-type-config';

interface CardProps {
  safetyAndCompliance: RailwayPowerSupplySafetyAndCompliance;
  onDetail: (data: RailwayPowerSupplySafetyAndCompliance) => void;
  onEdit: (data: RailwayPowerSupplySafetyAndCompliance) => void;
  onDelete: (id: string) => Promise<void>;
  refetch: () => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const RailwayPowerSupplySafetyAndComplianceCard: React.FC<CardProps> = ({
  safetyAndCompliance, onDetail, onEdit, onDelete
}) => {
  const { t } = useTranslation();
  const titlePath = 'project.other.railway-power-supply-safety-and-compliance.details';

  const renderChip = (value: boolean | null) => (
    <CustomChip
      skin='light'
      color={value ? 'success' : 'warning'}
      label={value ? t('common.yes') : t('common.no')}
      sx={{ ml: 1 }}
    />
  );

  return (
    <Card onClick={() => onDetail(safetyAndCompliance)} sx={{ cursor: 'pointer', mb: 4 }}>
      <CardContent>
        <Typography variant='h6' sx={{ mb: 4 }}>
          {safetyAndCompliance.railwayStationPlatformLayout?.name || t('project.other.railway-power-supply-safety-and-compliance.detail')}
        </Typography>
        <Grid container spacing={2}>

          {/* Safety Measures & Protocols */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {t(`${titlePath}.has-safety-measures`)}:
              {renderChip(safetyAndCompliance.safety_measures_and_protocols)}
            </Typography>
          </Grid>

          {/* Compliance with Standards */}
          <Grid item xs={12} sm={6}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {t(`${titlePath}.is-compliant`)}:
              {renderChip(safetyAndCompliance.compliance_with_electrical_safety_standards_and_regulations)}
            </Typography>
          </Grid>

          {/* Remark */}
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              {t(`${titlePath}.remark`)}:
              <Typography component='span' variant='body2' sx={{ ml: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '80%' }}>
                {safetyAndCompliance.remark || '-'}
              </Typography>
            </Typography>
          </Grid>

          {/* Actions (simplified for card view) */}
          {/* In a real app, this would use a dedicated actions component or button group */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RailwayPowerSupplySafetyAndComplianceCard;