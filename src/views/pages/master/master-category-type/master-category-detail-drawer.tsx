// components/MasterCategoryDetailDrawer.tsx
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MasterCategory } from 'src/types/master/master-types';
import { capitalizeFirstLetter } from 'src/utils/string';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import RowOptions from 'src/views/shared/listing/row-options';
import MasterCategoryDrawer from './master-category-drawer';

interface MasterCategoryDetailDrawerProps {
  masterCategory: MasterCategory;
  refetch: () => void;
  model: string;
  open: boolean;
  handleClose: () => void;
  typeId: string;
  onEdit: (category: MasterCategory) => void;
  onDelete: (id: string) => void;
}

const DetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="subtitle1">
      <strong>{label}: </strong>
    </Typography>
    <Box>{value}</Box>
  </Box>
);

const MasterCategoryDetailDrawer: React.FC<MasterCategoryDetailDrawerProps> = ({ masterCategory, refetch, model, open, handleClose, typeId, onEdit, onDelete }) => {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <CustomSideDrawer title={`master-category-detail`} handleClose={handleClose} open={open}>
      {() => (
        <Card>
          <CardContent>
            <Fragment>

              {
                <Box>
                  <DetailRow label={t('Title')} value={masterCategory?.title} />
                  <DetailRow label={t('Description')} value={masterCategory?.description} />
                  <DetailRow label={t('Date')} value={masterCategory?.created_at} />
                  <DetailRow label={`${t('Reference')} ${t('File')}`} value={masterCategory?.file_id} />

                  <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <FileDrawer id={masterCategory?.id} type={`${model.toLocaleUpperCase()}_TYPE`} /> &nbsp;
                    <ModelActionComponent
                      model={`${capitalizeFirstLetter(model)}type`}
                      model_id={masterCategory?.id}
                      refetchModel={refetch}
                      resubmit={() => { }}
                      title={''}
                      postAction={() => { }}
                    />
                    <RowOptions
                      onEdit={onEdit}
                      onDelete={() => onDelete(masterCategory.id)}
                      item={masterCategory}
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
              }
            </Fragment>
          </CardContent>
        </Card>
      )}
    </CustomSideDrawer>
  );
};

export default MasterCategoryDetailDrawer;
