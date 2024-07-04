import { Card, CardContent, Typography, Box } from '@mui/material'
import DescCollapse from 'src/views/components/custom/DescCollapse'
import FileDrawer from 'src/views/components/custom/files-drawer'
import ModelAction from 'src/views/components/custom/model-actions'

export const CardView = ({ data, setSelectedRow, setForm, title, fileType }) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant='body1'>
          <strong>Study Field:</strong> {data[title]?.title}
        </Typography>
        <Box display='flex' gap={1}>
          <strong>description:</strong>
          <DescCollapse desc={data.description} />
        </Box>
        <Box display='flex' alignItems='center' gap={2}>
          <strong>Reference File:</strong>
          <FileDrawer id={data.id} type={fileType} />
        </Box>
      </CardContent>
      <Box justifyContent='end' mx={3} mb={2} display='flex'>
        <ModelAction
          model_id={data.id}
          model='constructionresource'
          title='Field of Study'
          editPermission={{
            action: 'register_resource',
            subject: 'resource'
          }}
          handleEdit={() => {
            setSelectedRow(data)
            setForm(true)
          }}
        />
      </Box>
    </Card>
  )
}

export const CardDetail = ({ data, title, fileType }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: 2 }}>
        <Typography variant='body1'>
          <strong>Field of Study:</strong> {data[title]?.title}
        </Typography>
        <Box display='flex' gap={1}>
          <strong>description:</strong>
          <DescCollapse desc={data.description} />
        </Box>
        <Box display='flex' alignItems='center' gap={2}>
          <strong>Reference File:</strong>
          <FileDrawer id={data.id} type={fileType} />
        </Box>
      </Box>
      <Box justifyContent='end' mx={3} mb={2} display='flex'>
        <ModelAction model_id={data.id} model='construtionresourcestudyfield' title='Field of Study' />
      </Box>
    </Box>
  )
}
