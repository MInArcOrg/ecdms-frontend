import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import FileDrawer from '../../files-drawer'
import ModelAction from '../../model-actions'
import { useTranslation } from 'react-i18next'

// Define types for the props
interface Item {
  title: string
  value: string | number
}

interface OtherCardProps {
  items: Item[]
  title: string
  toggleDrawer: () => void
  editPermission: boolean
  id: number | string
  model: string
  hasRefernce: boolean
  type: string
  index: number
  toggleDetailDrawer: () => void
}

const OtherCard: React.FC<OtherCardProps> = ({
  items,
  title,
  toggleDrawer,
  editPermission,
  id,
  model,
  hasRefernce,
  type,
  index,
  toggleDetailDrawer
}) => {
  const { t } = useTranslation()

  return (
    <Card>
      <CardContent>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography
            variant='h6'
            component='div'
            color='primary.main'
            onClick={toggleDetailDrawer}
            sx={{ cursor: 'pointer' }}
          >
            {t(title)} 0{index + 1}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {items.map((item, itemIndex) => (
          <Box display='flex' justifyContent='space-between' alignItems='center' key={itemIndex}>
            <Typography variant='body1'>{t(item.title)}</Typography>
            <Typography variant='body1'>{item.value}</Typography>
          </Box>
        ))}
        {hasRefernce && (
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='body1'>{`${t('Reference')} ${t('Files')}`}</Typography>
            <FileDrawer id={id} type={type} />
          </Box>
        )}
      </CardContent>
      <Box display='flex' justifyContent='flex-end' alignItems='center' p={2}>
        <ModelAction
          handleEdit={toggleDrawer}
          editPermission={editPermission}
          model={model}
          model_id={id}
          title={title}
          refetchModel={() => {}}
        />
      </Box>
    </Card>
  )
}

export default OtherCard
