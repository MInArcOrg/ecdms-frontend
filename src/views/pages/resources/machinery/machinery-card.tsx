import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { MachineryInformation } from 'src/types/resource/index';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface ProfessionalCardProps {
  machineryInformation: MachineryInformation;
  refetch: () => void;
  onEdit: (machineryInformation: MachineryInformation) => void;
  onDelete: (id: string) => void;
}

const MachineryInformationCard: React.FC<ProfessionalCardProps> = ({ machineryInformation, refetch, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Link href={`/resources/${typeId}/details/${machineryInformation.id}/general-info`} passHref>
              <Typography
                component="a"
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {`${machineryInformation.plate_no || ''}`}
              </Typography>
            </Link>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('Type')}: {machineryInformation.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('Owner Name')}: {machineryInformation.owner_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('Make / Model')}: {`${machineryInformation.make || ''}${machineryInformation.model ? ` • ${machineryInformation.model}` : ''}`}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="MachineryInformation"
          model_id={machineryInformation?.id || ''}
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
          onEdit={() => onEdit(machineryInformation)}
          onDelete={() => onDelete(machineryInformation?.id || '')}
          item={machineryInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default MachineryInformationCard;
