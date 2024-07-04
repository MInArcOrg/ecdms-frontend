import { Icon } from '@iconify/react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItemButton,
  Tooltip,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getResourceImageUrl } from 'src/services/resources'
import DescCollapse from '../DescCollapse'
import ReactCropImage from './ReactCropImage'
import { getModelsById } from 'src/services/master/typeModels'
import { useRouter } from 'next/router'
import FileDrawer from 'src/views/components/custom/files-drawer'
import { uploadableResourceFileTypes } from 'src/services/file/file-service'
import { useTranslation } from 'react-i18next'

const StyledListItemBtn = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '0.5rem',
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,

    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}))

function ResourceLayout({ children, id, data, goBack, uploadImage, baseRoute, typeid, isProject }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [randNum, setRandNum] = useState(Math.random())
  const [routes, setRoutes] = useState([])
  const router = useRouter()
  const { t, i18n } = useTranslation()

  const [{ data: moduleModels, loading: modelsLoading, error }] = getModelsById(typeid ? typeid : router?.query?.typeid)

  const handleCropComplete = croppedImage => {
    setLoading(true)
    uploadImage(croppedImage).then(() => {
      setRandNum(Math.random())
      setLoading(false)
    })
  }

  useEffect(() => {
    if (moduleModels?.length > 0) {
      const arr = moduleModels.sort((a, b) => {
        const order = [t('specification'), t('brand'), t('resourcetype'), t('resourcequantityandprice')]

        return order.indexOf(a.model) - order.indexOf(b.model)
      })

      const routes = arr.map(module => {
        const title =
          module.model == 'specification'
            ? t('Specifications')
            : module.model == 'brand'
            ? t('Brands')
            : module.model == 'resourcetype'
            ? t('Types')
            : module.model == 'resourcequantityandprice'
            ? t('Unit Price & Quantity')
            : module.model == 'studyfield'
            ? t('Field of Study')
            : module.model == 'studylevel'
            ? t('Study Level')
            : module.model == 'workexperience'
            ? t('Work Experience')
            : module.model == 'salary'
            ? t('Salary')
            : ''

        return {
          title: title,
          route: `${baseRoute}/${
            module.model == 'resourcequantityandprice'
              ? 'priceandquantity'
              : module.model == 'resourcetype'
              ? 'type'
              : module.model
          }/`
        }
      })

      setRoutes(routes)
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleModels, i18n.language])

  return (
    <Box display='flex' flexDirection='column' gap={5}>
      <ReactCropImage open={open} setOpen={setOpen} onCropComplete={handleCropComplete} />
      <Card sx={{ p: 5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            pl: 3
          }}
        >
          <Icon icon='mdi:arrow-left' fontSize={20} cursor='pointer' onClick={() => goBack()} />
          <Typography variant='body2' color='primary' sx={{ cursor: 'pointer' }}>
            #{id?.substr(0, 8)}
          </Typography>
        </Box>
      </Card>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Card>
            <Tooltip title='Upload Resource Picture' placement='top' arrow>
              {loading ? (
                <CircularProgress sx={{ ml: '50%', mt: 5 }} />
              ) : (
                <CardMedia
                  sx={{ height: 160, cursor: isProject ? 'default' : 'pointer' }}
                  onClick={() => setOpen(isProject ? false : true)}
                  key={data?.image_id}
                  image={
                    data?.image_id
                      ? getResourceImageUrl(data.id) + `?${randNum ? `rand=${randNum}` : ''}`
                      : 'https://via.placeholder.com/300x300'
                  }
                  alt='resource image'
                />
              )}
            </Tooltip>

            <CardContent>
              <Typography gutterBottom variant='h6' my={1}>
                <strong>{t('Name')}</strong>: {data?.title}
              </Typography>
              <Box display='flex' flexWrap='wrap' mt={2}>
                <Typography variant='body1' fontWeight='bold' mr={2}>
                  {t('Description')}:
                </Typography>
                <DescCollapse desc={data?.description} />
              </Box>
              <Box display='flex' flexWrap='wrap' mt={2}>
                <Typography variant='body1' fontWeight='bold' mr={2}>
                  {t('Reference')} {t('Files')}:
                </Typography>
                <FileDrawer id={data?.id} type={uploadableResourceFileTypes.resource} />
              </Box>

              <List>
                {modelsLoading && <CircularProgress sx={{ ml: '50%', mt: 5 }} />}
                {routes?.map((r, index) => {
                  const isSelected = router.asPath == r.route

                  return (
                    <StyledListItemBtn key={index} selected={isSelected} component={Link} href={r.route}>
                      <Box display='flex' alignItems='center' gap={5}>
                        <Icon icon='mdi:chevron-right' fontSize='1.8rem' />
                        <Typography
                          gutterBottom
                          variant='subtitle1'
                          sx={{
                            color: isSelected ? 'primary.contrastText' : 'text.primary'
                          }}
                        >
                          {r.title}
                        </Typography>
                      </Box>
                    </StyledListItemBtn>
                  )
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ResourceLayout
