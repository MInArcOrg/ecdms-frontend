import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderMaterial } from 'src/types/stakeholder/stackholder-material';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface MaterialCardProps {
  material: StakeholderMaterial;
  refetch: () => void;
  onEdit: (material: StakeholderMaterial) => void;
  onDelete: (id: string) => void;
  onDetail: (material: StakeholderMaterial) => void;
  materialCategories: StakeholderMaterial[];
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, refetch, onEdit, onDelete, onDetail, materialCategories }) => {
  const { t } = useTranslation();

  const getCategoryName = (categoryId: string) => {
    const category = materialCategories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A';
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(material)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {material.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.material.category')}: {getCategoryName(material.material_category)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.material.subcategory')}: {material.material_subcategory || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.material.quantity')}: {material.quantity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.material.unit-price')}: {material.unit_price || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.material.location')}: {material.location || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderMaterial"
          model_id={material?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholdermaterial'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholdermaterial'
          }}
          onEdit={() => onEdit(material)}
          onDelete={() => onDelete(material?.id || '')}
          item={material}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default MaterialCard;
