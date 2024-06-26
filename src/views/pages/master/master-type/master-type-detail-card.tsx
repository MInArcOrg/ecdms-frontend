import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterType } from 'src/types/master/master-types';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import MasterTypeDrawer from './master-type-drawer';
import { capitalizeFirstLetter } from 'src/utils/string';

function MasterTypeDetailCard({
  masterType,
  isLoading = false,
  refetch,
  model
}: {
  masterType: MasterType;
  isLoading: boolean;
  refetch: () => void;
  model: string;
}) {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState<boolean>();
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  async function handleDelete(id: string): Promise<void> {
    await masterTypeApiService.delete(model, id);
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
            <div>Loading...</div>
          ) : (
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6">
                  <strong>{t('Title')}: </strong>
                  {masterType?.title}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
                <Typography variant="subtitle1" mt={-0.5}>
                  <strong>{t('Description')}: </strong>
                </Typography>
                <Box>{masterType?.description}</Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  <strong>{t('Date')}: </strong>
                  {/* {} */}
                </Typography>
              </Box>

              <Box display="flex" gap={2} alignItems="center">
                <Typography variant="subtitle1">
                  <strong>
                    {t('Reference')} {t('File')}:{' '}
                  </strong>
                </Typography>
                {/* <FileDrawer id={store.activeType?.id} type={fileType} /> */}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <ModelActionComponent
                  model={`${capitalizeFirstLetter(model)}type`}
                  model_id={masterType?.id}
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
                  onEdit={(item) => handleEdit()}
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
}

export default MasterTypeDetailCard;
