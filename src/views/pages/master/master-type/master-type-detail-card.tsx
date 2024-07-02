// components/MasterTypeDetailCard.tsx
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterType } from 'src/types/master/master-types';
import { capitalizeFirstLetter } from 'src/utils/string';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import MasterTypeDrawer from './master-type-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface MasterTypeDetailCardProps {
  masterType: MasterType;
  isLoading: boolean;
  refetch: () => void;
  model: string;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">
      <strong>{label}: </strong>
    </Typography>
    <Box>{value}</Box>
  </Box>
);

const MasterTypeDetailCard: React.FC<MasterTypeDetailCardProps> = ({ masterType, isLoading, refetch, model }) => {
  const router = useRouter();

  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  async function handleDelete(id: string): Promise<void> {
    await masterTypeApiService.delete(model, id);
    router.push(`/master-data/${model}`);
  }

  const handleEdit = () => {
    toggleDrawer();
  };

  return (
    <Fragment>
      {showDrawer && (
        <MasterTypeDrawer model={model} open={showDrawer} toggle={toggleDrawer} masterData={masterType as MasterType} refetch={refetch} />
      )}
      <Card>
        <CardContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box>
              <DetailRow label={t('Title')} value={masterType?.title} />
              <DetailRow label={t('Description')} value={masterType?.description} />
              <DetailRow label={t('Date')} value={masterType?.created_at} />
              <DetailRow label={`${t('Reference')} ${t('File')}`} value={masterType?.file_id} />

              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <FileDrawer id={masterType?.id} type={`${model.toLocaleUpperCase()}_TYPE`} /> &nbsp;
                <ModelActionComponent
                  model={`${capitalizeFirstLetter(model)}type`}
                  model_id={masterType?.id}
                  refetchModel={refetch}
                  resubmit={() => {}}
                  title={''}
                  postAction={() => {}}
                />
                <RowOptions
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(masterType.id)}
                  item={masterType}
                  options={[]}
                  deletePermissionRule={{
                    action: 'delete',
                    subject: `${model}type`
                  }}
                  editPermissionRule={{
                    action: 'update',
                    subject: `${model}type`
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default MasterTypeDetailCard;
