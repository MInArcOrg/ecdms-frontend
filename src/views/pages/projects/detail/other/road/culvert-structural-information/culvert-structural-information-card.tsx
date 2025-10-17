'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { CulvertStructuralInformation } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CulvertStructuralInformationCardProps {
  culvertStructuralInformation: CulvertStructuralInformation;
  refetch: () => void;
  onEdit: (culvertStructuralInformation: CulvertStructuralInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (culvertStructuralInformation: CulvertStructuralInformation) => void;
}

const CulvertStructuralInformationCard: React.FC<CulvertStructuralInformationCardProps> = ({
  culvertStructuralInformation,
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
              onClick={() => onDetail(culvertStructuralInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {culvertStructuralInformation?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-structural-information.details.name')}: {culvertStructuralInformation?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-structural-information.details.culvert-type-id')}:{' '}
            {culvertStructuralInformation?.culvert_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-structural-information.details.pier-type-id')}: {culvertStructuralInformation?.pier_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-structural-information.details.abutment-type-id')}:{' '}
            {culvertStructuralInformation?.abutment_type_id || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="CulvertStructuralInformation"
          model_id={culvertStructuralInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'culvertstructuralinformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertstructuralinformation'
          }}
          onEdit={() => onEdit(culvertStructuralInformation)}
          onDelete={() => onDelete(culvertStructuralInformation.id)}
          item={culvertStructuralInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default CulvertStructuralInformationCard;
