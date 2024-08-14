import { Box, Button, CardContent, CircularProgress, FormControl, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import documentApiService from 'src/services/document/document-service';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import DescCollapse from '../resources/detail/desc-collapse';

interface DocumentDetailProps {
  show: boolean;
  toggleDetail: () => void;
  documentId: string;
}

function DocumentDetail({ show, toggleDetail, documentId }: DocumentDetailProps) {
  const { t, i18n } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['document', documentId],
    queryFn: () => documentApiService.getOne(documentId, {})
  });

  return (
    <Fragment>
      <CustomSideDrawer title={t('document-detail')} handleClose={toggleDetail} open={show}>
        {() => (
          <Box>
            {isLoading && <CircularProgress sx={{ ml: '50%', my: '50%' }} />}
            {!isLoading && !error && data && (
              <CardContent>
                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Title')}: </strong>
                    {data.title}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Type')}: </strong>
                    {data.documenttype?.title}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Category')}: </strong>
                    {data.documentcategory?.title}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Subcategory')}: </strong>
                    {data.documentsubcategory?.title}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Author')}: </strong>
                    {data.author}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Edition')}: </strong>
                    {data.edition}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Publication Date')}: </strong>
                    {getDynamicDate(i18n, data.publication_date).toDateString()}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('ISBN Number')}: </strong>
                    {data.isbn}
                  </Typography>
                </FormControl>

                <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="light" fontSize="16px">
                    <strong>{t('Copyright Notice')}: </strong>
                    {data.copy_right_notice}
                  </Typography>
                </FormControl>

                <Box display="flex" gap={1} alignItems="start" mb={3} flexWrap="wrap">
                  <Typography variant="subtitle1" fontWeight="bold" fontSize="16px" mt={-1}>
                    {t('Description')}:
                  </Typography>
                  <DescCollapse desc={data.description} />
                </Box>

                <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Typography variant="h5">{t('Attachment')}:</Typography>
                    <Box>
                      <Button
                        component="a"
                        variant="outlined"
                        download
                        sx={{
                          display: 'flex',
                          gap: 2,
                          p: 1.5
                        }}
                      >
                        {data.attachement?.substr(data.attachement?.lastIndexOf('.') + 1)}
                      </Button>
                    </Box>
                  </Box>
                </FormControl>
              </CardContent>
            )}
          </Box>
        )}
      </CustomSideDrawer>
    </Fragment>
  );
}

export default DocumentDetail;
