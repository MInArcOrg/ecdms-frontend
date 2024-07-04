import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import { Box } from '@mui/system'
import DescCollapse from '../DescCollapse'
import ModelAction from '../model-actions'
import { useTranslation } from 'react-i18next'

function CustomCard({ data, toggleForm, actionData, editPermission, children, isProject }) {
  const { t } = useTranslation()

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader title={data.title} />
      <CardContent>
        {children}
        <Box display='flex' flexWrap='wrap' mt={3}>
          <Typography variant='body1' fontWeight='bold' mr={2}>
            {t('Description')}:
          </Typography>
          <DescCollapse desc={data.description} />
        </Box>

        <Typography variant='subtitle1' sx={{ mt: 4 }}>
          <strong>{t('Data Source')}:</strong> {data.datasource}
        </Typography>
      </CardContent>
      <Box display='flex' pb={4} px={3} justifyContent='end'>
        <ModelAction
          model_id={data.id}
          model={actionData?.model}
          title={actionData?.title}
          editPermission={editPermission}
          handleEdit={() => toggleForm(data)}
        />
      </Box>
    </Card>
  )
}

export default CustomCard
