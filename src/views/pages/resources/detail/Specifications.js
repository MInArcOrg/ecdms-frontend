import { Icon } from '@iconify/react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import Can from 'src/layouts/components/acl/Can'
import { deletePhoto, uploadablePhotoTypes, uploadProfilePicture } from 'src/services/file/file-service'
import * as specService from 'src/services/resources/specifications'
import ApiErrors from '../../ApiErrors'
import SpecificationForm from '../../forms/resources/SpecificationForm'
import CustomCard from './CustomCard'
import ImageSwiper from './ImageSwiper'
import { useTranslation } from 'react-i18next'

function Specifications({ id, isProject }) {
  const [{ data: specification, loading, error }, getData] = specService.getSpecifications(id)
  const [{ loading: postLoading, error: postError }, postData] = specService.postSpecification()
  const [{ loading: putLoading, error: putError }, putData] = specService.updateSpecification()
  const [form, setForm] = useState(false)
  const [selected, setSelected] = useState(undefined)
  const [refetchImages, setRefetchImages] = useState(false)
  const { t } = useTranslation()

  const handleSubmit = async ({ values, removeImages }) => {
    const formData = new FormData()
    formData.append('resource_id', id)
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('datasource', values.data_source)

    if (selected) {
      return putData({
        url: `/construction-resource-specification/${selected.id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(async () => {
          const uploadPromises =
            values.images.length > 0
              ? Promise.all(
                  values.images.map(image =>
                    uploadProfilePicture(selected.id, uploadablePhotoTypes.resourceSpecification, image)
                  )
                )
              : Promise.resolve([])

          const deletePromises =
            removeImages.length > 0 ? Promise.all(removeImages.map(image => deletePhoto(image))) : Promise.resolve([])

          await Promise.all([uploadPromises, deletePromises]).then(() => {
            getData().then(() => {
              setRefetchImages(!refetchImages)
            })
          })

          return true
        })
        .catch(() => {
          return false
        })
    }

    return postData({ data: formData, headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => {
        if (values.images.length > 0) {
          Promise.all(
            values.images.map(async image => {
              return await uploadProfilePicture(res.data.id, uploadablePhotoTypes.resourceSpecification, image)
            })
          ).then(() => {
            getData().then(() => {
              setRefetchImages(!refetchImages)
            })
          })

          return true
        }
        getData()

        return true
      })
      .catch(() => {
        return false
      })
  }

  return (
    <Box display='flex' flexDirection='column'>
      {form && (
        <SpecificationForm
          show={form}
          toggleDrawer={setForm}
          data={selected}
          title={t('Specifications')}
          handleFormSubmit={handleSubmit}
          loading={postLoading || putLoading}
          error={postError || putError}
        />
      )}
      {!isProject && (
        <Can do='register_resources' on='resources'>
          <Icon
            icon='mdi:plus'
            fontSize='1.8rem'
            cursor='pointer'
            style={{ alignSelf: 'end' }}
            onClick={() => {
              setSelected(undefined)
              setForm(true)
            }}
          />
        </Can>
      )}
      {error && <ApiErrors error={error} />}
      {loading && <CircularProgress sx={{ marginLeft: '50%' }} />}
      <Grid container columnSpacing={4}>
        {specification?.data?.map(spec => (
          <Grid item xs={12} md={6} key={spec.id}>
            <CustomCard
              data={spec}
              toggleForm={data => {
                setSelected(() => data)
                setForm(() => true)
              }}
              actionData={{ model: 'specification', title: 'Resource Specification' }}
              editPermission={{ action: 'register_resource', subject: 'resource' }}
              isProject={isProject}
            >
              <ImageSwiper id={spec.id} refetch={refetchImages} />
            </CustomCard>
          </Grid>
        ))}
      </Grid>
      {!loading && !error && specification?.data?.length === 0 && (
        <Typography variant='h6' align='center'>
          {t('No specifications found')}
        </Typography>
      )}
    </Box>
  )
}

export default Specifications
