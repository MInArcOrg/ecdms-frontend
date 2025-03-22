import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ProfessionalCertification } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CertificationCardProps {
  certification: ProfessionalCertification;
  refetch: () => void;
  onEdit: (certification: ProfessionalCertification) => void;
  onDelete: (id: string) => void;
  onDetail: (certification: ProfessionalCertification) => void;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(certification)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {certification.certificate_title}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.certification.certifying-body')}: {certification.certifying_body}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.certification.issue-date')}: {certification.issue_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.certification.expire-date')}: {certification?.expire_date || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={certification?.id || ''} type={uploadableResourceFileTypes.professionalCertification} />
        <ModelAction
          model="ProfessionalCertification"
          model_id={certification?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'professionalcertification'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'professionalcertification'
          }}
          onEdit={() => onEdit(certification)}
          onDelete={() => onDelete(certification?.id || '')}
          item={certification}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default CertificationCard;
