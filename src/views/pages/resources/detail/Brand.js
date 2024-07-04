import { Icon } from '@iconify/react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { deletePhoto, uploadablePhotoTypes, uploadProfilePicture } from 'src/services/file/file-service'
import * as brandService from 'src/services/resources/brand'
import ApiErrors from '../../ApiErrors'
import SpecificationForm from '../../forms/resources/SpecificationForm'
import CustomCard from './CustomCard'
import ImageSwiper from './ImageSwiper'
import Can from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

function Brand({ id, isProject }) {
  const [{ data: brands, loading, error }, getData] = brandService.getBrands(id)
  const [{ loading: postLoading, error: postError }, postData] = brandService.postBrand()
  const [{ loading: putLoading, error: putError }, putData] = brandService.updateBrand()

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
        url: `/construction-resource-brand/${selected.id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
        .then(async () => {
          const uploadPromises =
            values.images.length > 0
              ? Promise.all(
                  values.images.map(image =>
                    uploadProfilePicture(selected.id, uploadablePhotoTypes.resourceBrand, image)
                  )
                )
              : Promise.resolve([])

          const deletePromises =
            removeImages.length > 0 ? Promise.all(removeImages.map(image => deletePhoto(image))) : Promise.resolve([])

          await Promise.all([uploadPromises, deletePromises]).then(() => {
            getData().then(() => {
              setRefetchImages(true)
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
              return await uploadProfilePicture(res.data.id, uploadablePhotoTypes.resourceBrand, image)
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
          data={selected}
          loading={postLoading || putLoading}
          toggleDrawer={setForm}
          title={t('Brand')}
          handleFormSubmit={handleSubmit}
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
        {brands?.data?.map(brand => (
          <Grid item xs={12} sm={6} md={6} key={brand.id}>
            <CustomCard
              data={brand}
              imageUrl={
                brand.image !== '' ? brandService.getBrandImageUrl(brand.id) + `?${new Date().getTime()}` : undefined
              }
              toggleForm={data => {
                setSelected(() => data)
                setForm(() => true)
              }}
              actionData={{ model: 'brand', title: 'Resource Brand' }}
              editPermission={{ action: 'register_resources', subject: 'resources' }}
              isProject={isProject}
            >
              <ImageSwiper id={brand.id} refetch={refetchImages} />
            </CustomCard>
          </Grid>
        ))}
      </Grid>
      {!loading && !error && brands?.data?.length === 0 && (
        <Typography variant='h6' align='center'>
          {t('No Brands found')}
        </Typography>
      )}
    </Box>
  )
}

export default Brand
