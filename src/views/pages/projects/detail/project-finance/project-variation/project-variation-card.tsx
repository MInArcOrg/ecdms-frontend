import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ProjectVariation } from 'src/types/project/project-finance';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

const ProjectVariationCard = ({
  projectVariation,
  refetch,
  onEdit,
  onDelete,
  type
}: {
  type: string;
  projectVariation: ProjectVariation;
  refetch: () => void;
  onEdit: (projectVariation: ProjectVariation) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {t(type)} {1}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            {projectVariation?.justification}
          </Typography>
        </Box>
        <Box mt={2} display="flex">
          <Typography mr="0.5rem">{formatCurrency(projectVariation?.amount)}</Typography>
          <Icon icon="mdi:calendar-blank" fontSize={20} />
          <Typography mr="0.5rem">{projectVariation?.extension_time} </Typography>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={projectVariation.id} type={uploadableProjectFileTypes.variation} /> &nbsp;
        <Box sx={{ display: 'flex' }}>
          <ModelActionComponent
            model="Variation"
            model_id={projectVariation.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            title={''}
            postAction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(projectVariation.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'variation'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'variation'
            }}
            item={projectVariation}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectVariationCard;
