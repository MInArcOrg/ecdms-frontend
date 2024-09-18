import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { BuildingEnvelopMaterial } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BuildingEnvelopMaterialCardProps {
  buildingEnvelopMaterial: BuildingEnvelopMaterial;
  refetch: () => void;
  onEdit: (buildingEnvelopMaterial: BuildingEnvelopMaterial) => void;
  onDelete: (id: string) => void;
  onDetail: (buildingEnvelopMaterial: BuildingEnvelopMaterial) => void;
}

const BuildingEnvelopMaterialCard: React.FC<BuildingEnvelopMaterialCardProps> = ({
  buildingEnvelopMaterial,
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
              onClick={() => onDetail(buildingEnvelopMaterial)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {buildingEnvelopMaterial?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.exterior-walls')}: {buildingEnvelopMaterial?.exterior_walls || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.roof-assembly')}: {buildingEnvelopMaterial?.roof_assembly || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.exterior-windows')}: {buildingEnvelopMaterial?.exterior_windows || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.exterior-doors')}: {buildingEnvelopMaterial?.exterior_doors || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.shading-components')}:{' '}
            {buildingEnvelopMaterial?.shading_components || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={buildingEnvelopMaterial.id} type={uploadableProjectFileTypes.other.buildingEnvelopMaterial} />
        <ModelAction
          model="BuildingEnvelopMaterial"
          model_id={buildingEnvelopMaterial.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(buildingEnvelopMaterial)}
          onDelete={() => onDelete(buildingEnvelopMaterial.id)}
          item={buildingEnvelopMaterial}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BuildingEnvelopMaterialCard;
