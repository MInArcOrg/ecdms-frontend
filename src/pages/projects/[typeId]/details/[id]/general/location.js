import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import subMenuItems from './(subMenuItems)'
import ModelAction from 'src/views/components/custom/model-actions'
import LocationForm from 'src/views/components/forms/stakeholders/Location'
import { Icon } from '@iconify/react'
import { getAddress, postAddress, putAddress } from 'src/services/address'
import { useTranslation } from 'react-i18next'

const MapView = dynamic(() => import('src/views/components/custom/MapView'), {
  ssr: false
})

function Detail() {
  // states / hooks / variables
  const router = useRouter()
  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const [selectedData, setSelectedData] = useState(null)

  const [{ data, loading }, getLocation] = getAddress(id)

  const [{ loading: postLoading, error: postError }, postLocation] = postAddress()
  const [{ loading: putLoading, error: putError }, putLocation] = putAddress()

  //states / hooks / variables

  const [locationForm, setLocationForm] = useState(false)

  //Functions
  const handleSubmit = async data => {
    const params = {
      model_id: id,
      ...data
    }

    if (data.id) {
      return putLocation({
        url: `/address/${data.id}`,
        data: params
      }).then(() => {
        setLocationForm(false)
        getLocation()
      })
    }

    return postLocation({ data: params }).then(() => {
      setLocationForm(false)
      getLocation()
    })
  }

  useEffect(() => {
    if (id) {
      getLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const { t } = useTranslation()

  return (
    <Box>
      {locationForm && (
        <LocationForm
          show={true}
          data={selectedData}
          toggleDrawer={() => setLocationForm(!locationForm)}
          // title={data ? 'Edit Location' : 'Add Location'}
          title={data ? `${t('Edit')} ${t('Location')}` : `${t('Add')} ${t('Location')}`}
          // title='Location'
          handleFormSubmit={handleSubmit}
          postError={postError || putError}
          loading={postLoading || putLoading}
        />
      )}
      <ProjectLayout
        id={id}
        toggleForm={setDetailForm}
        activeMenu={0}
        activeSubMenu={2}
        subMenuItems={subMenuItems(id, typeid)}
      >
        {data && data.length === 0 && (
          <Box
            alignSelf='end'
            display='flex'
            justifyContent='flex-end'
            mb={3}
            sx={{
              cursor: 'pointer'
            }}
          >
            <Icon icon='mdi:plus' width='25' height='25' onClick={() => setLocationForm(true)} />
          </Box>
        )}

        {loading ? (
          <CircularProgress sx={{ ml: '50%' }} />
        ) : data?.length > 0 ? (
          <Fragment>
            {data?.map((item, index) => (
              <Card key={item.id} sx={{ mb: 3 }}>
                <CardContent>
                  <Box display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant='h6'>
                      {' '}
                      {t('Project')} {t('Location')}{' '}
                    </Typography>
                  </Box>
                  <Box>{<MapView position={[item.northing, item.easting]} />}</Box>

                  <Box mt={3} display='flex' gap={3}>
                    <Typography variant='body1'>
                      <strong>{t('Address')}:</strong> {item.country}, {item.city}, {item.region}, {item.subcity},{' '}
                      {item.street}, {item.block_number}, {item.house_number}
                    </Typography>
                  </Box>
                </CardContent>

                <Box display='flex' mb={3} mr={3} justifyContent='end'>
                  <ModelAction
                    handleEdit={() => {
                      setLocationForm(true)
                      setSelectedData(item)
                    }}
                    editPermission={{
                      action: 'register_projectinfo',
                      subject: 'projectinfo'
                    }}
                    model_id={item?.id}
                    title={`${t('Project')} ${t('Location')}`}
                    refetchModel={getLocation}
                  />
                </Box>
              </Card>
            ))}
          </Fragment>
        ) : (
          <Typography variant='h6' sx={{ textAlign: 'center' }}>
            {t('Location')} {t('Not Found')}
          </Typography>
        )}
      </ProjectLayout>
    </Box>
  )
}
Detail.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
}

export default Detail
