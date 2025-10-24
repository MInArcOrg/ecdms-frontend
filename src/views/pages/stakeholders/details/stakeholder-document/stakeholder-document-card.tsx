// src/views/stakeholder/document/document-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { parseISO } from 'date-fns';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './file-type-config';
import { StakeholderDocument } from 'src/types/stakeholder/other';

interface StakeholderDocumentCardProps {
  stakeholderDocument: StakeholderDocument;
  refetch: () => void;
  onEdit: (data: StakeholderDocument) => void;
  onDelete: (id: string) => void;
  onDetail: (data: StakeholderDocument) => void;
  model: string;
  fileTypesConfig: FileTypeConfig[];
}

const entitySubject = 'stakeholder-document';

const StakeholderDocumentCard: React.FC<
  StakeholderDocumentCardProps
> = ({ stakeholderDocument: data, refetch, onEdit, onDelete, onDetail, model, fileTypesConfig }) => {
  const { t } = useTranslation();

  const PRIMARY_FILE_TYPE = fileTypesConfig[0].type;

  const documentType = data.document_type || t('common.na');
  const title = data.title || t('common.na');
  const author = data.author || t('common.na');
  const edition = data.edition || t('common.na');
  const publicationDate = data.publication_date ? formatDynamicDate((data.publication_date)) : t('common.na');
  const isbn = data.isbn || t('common.na');
  const copyRightNotice = data.copy_right_notice || t('common.na');


  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(data)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {title} ({documentType})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('stakeholder.document.details.author')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {author}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('stakeholder.document.details.publication-date')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {publicationDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('stakeholder.document.details.edition')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {edition}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('stakeholder.document.details.isbn')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {isbn}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('stakeholder.document.details.copy-right-notice')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {copyRightNotice}
            </Typography>
          </Grid>


          {/* Dynamic File Attachments Section */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('common.form.file-attachments')}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {fileTypesConfig.map((fileType, index) => (
                <Box key={fileType.type} sx={{ mt: index > 0 ? 2 : 0 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {t(fileType.titleTKey)}
                  </Typography>
                  {data.id && (
                    <FileDrawer
                      id={data.id as string}
                      type={fileType.type}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {data.id && <FileDrawer id={data.id} type={PRIMARY_FILE_TYPE} />}

        {data.id && (
          <ModelAction
            model="StakeholderDocument"
            model_id={data.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: model || entitySubject
          }}
          editPermissionRule={{
            action: 'update',
            subject: model || entitySubject
          }}
          onEdit={() => onEdit(data)}
          onDelete={() => onDelete(data.id as string)}
          item={data}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default StakeholderDocumentCard;