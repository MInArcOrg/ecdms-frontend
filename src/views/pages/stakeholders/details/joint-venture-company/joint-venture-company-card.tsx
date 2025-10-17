import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface JointVentureCompanyCardProps {
  jointVentureCompany: JointVentureCompany;
  refetch: () => void;
  onEdit: (jointVentureCompany: JointVentureCompany) => void;
  onDelete: (id: string) => void;
  onDetail: (jointVentureCompany: JointVentureCompany) => void;
}

const JointVentureCompanyCard: React.FC<JointVentureCompanyCardProps> = ({ jointVentureCompany, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(jointVentureCompany)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {jointVentureCompany.company_name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.joint-venture-company.specialization')}: {jointVentureCompany.specialization || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.joint-venture-company.ownershipPercentage')}: {jointVentureCompany.ownership_percentage || 'N/A'}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.joint-venture-company.description')}: {jointVentureCompany.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="JointVentureCompany"
          model_id={jointVentureCompany?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'jointventurecompany'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'jointventurecompany'
          }}
          onEdit={() => onEdit(jointVentureCompany)}
          onDelete={() => onDelete(jointVentureCompany?.id || '')}
          item={jointVentureCompany}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default JointVentureCompanyCard;
