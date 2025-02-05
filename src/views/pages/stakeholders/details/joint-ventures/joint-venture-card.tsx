import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface JointVentureCardProps {
  jointVenture: JointVenture;
  refetch: () => void;
  onEdit: (jointVenture: JointVenture) => void;
  onDelete: (id: string) => void;
  onDetail: (jointVenture: JointVenture) => void;
}

const JointVentureCard: React.FC<JointVentureCardProps> = ({ jointVenture, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(jointVenture)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {jointVenture.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('jointVenture.memberCompaniesNo')}: {jointVenture.member_companies_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('jointVenture.reference')}: {jointVenture.reference || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="JointVenture"
          model_id={jointVenture?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'jointventure'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'jointventure'
          }}
          onEdit={() => onEdit(jointVenture)}
          onDelete={() => onDelete(jointVenture?.id || '')}
          item={jointVenture}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default JointVentureCard;
