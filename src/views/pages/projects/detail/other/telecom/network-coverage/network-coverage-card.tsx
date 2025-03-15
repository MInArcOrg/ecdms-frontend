import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { NetworkCoverage } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface NetworkCoverageCardProps {
  networkCoverage: NetworkCoverage;
  refetch: () => void;
  onEdit: (networkCoverage: NetworkCoverage) => void;
  onDelete: (id: string) => void;
  onDetail: (networkCoverage: NetworkCoverage) => void;
}

const NetworkCoverageCard: React.FC<NetworkCoverageCardProps> = ({ networkCoverage, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(networkCoverage)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {networkCoverage?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.network-infrastructure-type')}: {networkCoverage?.networkinfrastructuretype?.id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.total-coverage-area')}: {networkCoverage?.total_coverage_area?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.coverage-population-number')}: {networkCoverage?.coverage_population_number?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.active-users-number')}: {networkCoverage?.active_users_number?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.average-download-speed')}: {networkCoverage?.average_download_speed?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.average-upload-speed')}: {networkCoverage?.average_upload_speed?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.signal-strength')}: {networkCoverage?.signal_strength?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.network-coverage.details.others')}: {networkCoverage?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={networkCoverage.id} type={uploadableProjectFileTypes.other.networkCoverage} />
        <ModelAction
          model="NetworkCoverage"
          model_id={networkCoverage.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'networkcoverage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'networkcoverage'
          }}
          onEdit={() => onEdit(networkCoverage)}
          onDelete={() => onDelete(networkCoverage.id)}
          item={networkCoverage}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default NetworkCoverageCard;
