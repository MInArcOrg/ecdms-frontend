import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { Professional } from 'src/types/resource/index';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ProfessionalCardProps {
  professional: Professional;
  refetch: () => void;
  onEdit: (professional: Professional) => void;
  onDelete: (id: string) => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, refetch, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Link href={`/resources/${typeId}/details/${professional.id}/general-info`} passHref>
              <Typography
                component="a"
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {`${professional.full_name}`}
              </Typography>
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.nationalIdNo')}: {professional.national_id_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.email')}: {professional.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.phoneNo')}: {professional.phone_no}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="Professional"
          model_id={professional?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'resource'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'resource'
          }}
          onEdit={() => onEdit(professional)}
          onDelete={() => onDelete(professional?.id || '')}
          item={professional}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ProfessionalCard;
