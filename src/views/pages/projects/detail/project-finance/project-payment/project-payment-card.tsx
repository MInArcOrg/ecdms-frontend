import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ProjectPayment } from 'src/types/project/project-finance';
import { formatCurrency } from 'src/utils/formatter/currency';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

const ProjectPaymentCard = ({
  projectPayment,
  refetch,
  onEdit,
  type,
  onDelete
}: {
  type: string;
  projectPayment: ProjectPayment;
  refetch: () => void;
  onEdit: (projectPayment: ProjectPayment) => void;
  onDelete: (id: string) => void;
}) => {
  return (
    <Card>
      <CardContent>
        <Box justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">{projectPayment?.title}</Typography>
          <Typography variant="body2" fontWeight="bold">
            {projectPayment?.description}
          </Typography>
        </Box>
        <Box mt={2} display="flex">
          <Typography mr="0.5rem">{formatCurrency(projectPayment?.amount)}</Typography>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={projectPayment.id} type={uploadableProjectFileTypes.payment} /> &nbsp;
        <Box sx={{ display: 'flex' }}>
          <ModelActionComponent
            model="Payment"
            model_id={projectPayment.id}
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
            item={projectPayment}
            onDelete={() => onDelete(projectPayment.id)}
            options={[]}
            deletePermissionRule={{
              action: 'delete',
              subject: 'payment'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'payment'
            }}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ProjectPaymentCard;
