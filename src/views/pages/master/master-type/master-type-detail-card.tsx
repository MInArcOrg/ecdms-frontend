import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { MasterType } from 'src/types/master/master-types';

function MasterTypeDetailCard({ masterType, isLoading = false }: { masterType?: MasterType; isLoading: boolean }) {
  const { t } = useTranslation();

  return (
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
              {/* <ModelAction
                title={editPermission?.title}
                model_id={store?.activeType?.id}
                model={editPermission?.subject}
                editPermission={editPermission}
                handleEdit={() => {
                  setSelectedType(store.activeType)
                  handleDrawer('type')
                }}
              /> */}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default MasterTypeDetailCard;
