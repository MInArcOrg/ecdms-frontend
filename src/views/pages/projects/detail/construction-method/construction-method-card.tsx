import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ConstructionMethod } from 'src/types/project/construction-method';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ConstructionMethodCardProps {
  constructionMethod: ConstructionMethod;
  refetch: () => void;
  onEdit: (method: ConstructionMethod) => void;
  onDelete: (id: string) => void;
  onDetail: (method: ConstructionMethod) => void;
}

const ConstructionMethodCard: React.FC<ConstructionMethodCardProps> = ({
  constructionMethod,
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
              onClick={() => onDetail(constructionMethod)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
                textTransform: 'none'
              }}
            >
              {constructionMethod.projectMethod?.title || constructionMethod.project_method?.title || constructionMethod.project_method_id}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.construction-method.description')}: {constructionMethod.description || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="ConstructionMethod"
          model_id={constructionMethod?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(constructionMethod)}
          onDelete={() => onDelete(constructionMethod?.id || '')}
          item={constructionMethod}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ConstructionMethodCard;
