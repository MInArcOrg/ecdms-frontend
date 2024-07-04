import { Icon } from '@iconify/react'
import { Card, CardContent, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import ModelAction from '../model-actions'
import ApiErrors from '../../ApiErrors'
import Can from 'src/layouts/components/acl/Can'
import StudyFieldForm from 'src/views/components/forms/resources/StudyFieldForm'
import { uploadFiles, uploadableResourceFileTypes } from 'src/services/file/file-service'
import {
  getResourceStudyLevels,
  postResourceStudyLevel,
  updateResourceStudyLevel
} from 'src/services/resources/studyLevel'
import { getStudyLevels } from 'src/services/master/studyLevels'
import { CardDetail, CardView } from 'src/views/components/custom/resources/Common'
import { useTranslation } from 'react-i18next'

function StudyLevel({ id, isProject }) {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [form, setForm] = useState(false)
  const { t } = useTranslation()

  const [{ data, loading, error }, refetch] = getResourceStudyLevels(id, page || 0, pageSize || 10)
  const [{ loading: postLoading, error: postError }, post] = postResourceStudyLevel()
  const [{ loading: putLoading, error: putError }, put] = updateResourceStudyLevel(selectedRow?.id)
  const [{ data: fields, error: fieldsError }] = getStudyLevels()

  const columns = [
    {
      field: 'id',
      headerName: t('ID'),
      width: 85,
      renderCell: params => {
        return (
          <Typography
            variant='body1'
            sx={{ cursor: 'pointer' }}
            color='primary'
            onClick={() => {
              setSelectedRow(params.row)
              setShowDetail(true)
            }}
          >
            {params.row?.id.slice(0, 6)}...
          </Typography>
        )
      }
    },
    {
      field: 'studylevel',
      headerName: t('Study Level'),
      minWidth: 200,
      renderCell: params => {
        return (
          <Typography
            variant='body1'
            color='primary'
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setSelectedRow(() => params.row)
              setShowDetail(true)
            }}
          >
            {params.row.studylevel?.title}
          </Typography>
        )
      }
    },
    { field: 'description', headerName: t('Description'), width: 200 },
    {
      field: 'status',
      headerName: t('Status'),
      minWidth: 130,
      renderCell: params => {
        return (
          <Box display='flex' alignItems='center' gap={2}>
            <ModelAction
              model_id={params.row.id}
              model='construtionresourcestudylevel'
              title='Level of Study'
              editPermission={{
                action: 'register_resource',
                subject: 'resource'
              }}
              handleEdit={() => {
                setSelectedRow(() => params.row)
                setForm(true)
              }}
            />
          </Box>
        )
      }
    }
  ]

  const handleSubmit = async values => {
    const params = {
      resource_id: id,
      studylevel_id: values.field.id,
      description: values.description
    }

    if (selectedRow) {
      return put({ data: params }).then(res => {
        if (values.referenceFile.length > 0) {
          return Promise.all(
            values.referenceFile.map(async file =>
              uploadFiles(file, uploadableResourceFileTypes.studyLevel, selectedRow.id)
            )
          ).then(() => {
            refetch()

            return true
          })
        }

        refetch()

        return true
      })
    }

    return post({ data: params }).then(res => {
      if (values.referenceFile.length > 0) {
        return Promise.all(
          values.referenceFile.map(async file => uploadFiles(file, uploadableResourceFileTypes.studyLevel, res.data.id))
        ).then(() => {
          refetch()

          return true
        })
      }

      refetch()

      return true
    })
  }

  return (
    <Box display='flex' flexDirection='column'>
      {fields && form && (
        <StudyFieldForm
          show={form}
          fields={fields}
          data={selectedRow}
          toggleDrawer={setForm}
          title={t('Study Level')}
          handleFormSubmit={handleSubmit}
          error={postError || putError}
          loading={postLoading || putLoading}
        />
      )}

      <Can do='register_resources' on='resources'>
        {!isProject && (
          <Icon
            icon={`mdi:${showDetail ? 'close' : 'plus'}`}
            fontSize='1.8rem'
            cursor='pointer'
            style={{ alignSelf: 'end' }}
            onClick={() => {
              setSelectedRow(null)
              if (showDetail) {
                setShowDetail(false)

                return
              }
              setForm(true)
            }}
          />
        )}
      </Can>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ m: 2 }}>
            {t('Study Level')}
          </Typography>

          {error && <ApiErrors error={error} />}
          {!error && showDetail ? (
            <CardDetail data={selectedRow} title='studylevel' fileType={uploadableResourceFileTypes.studyLevel} />
          ) : desktop ? (
            <Box height={375} mt={4} overflow='auto'>
              <DataGrid
                rows={data ? data.data : []}
                columns={columns}
                loading={loading}
                rowCount={data ? data.totalItems : 0}
                pageSize={pageSize}
                paginationMode='server'
                rowsPerPageOptions={[5, 10, 20, 50]}
                onPageChange={newPage => {
                  setPage(newPage)
                }}
                onPageSizeChange={newPageSize => {
                  setPageSize(newPageSize)
                }}
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {data?.data?.map((study, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CardView
                    data={study}
                    setForm={setForm}
                    setSelectedRow={setSelectedRow}
                    title='studylevel'
                    fileType={uploadableResourceFileTypes.studyLevel}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default StudyLevel
