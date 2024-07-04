import { Icon } from '@iconify/react'
import { Card, CardContent, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import ModelAction from '../model-actions'
import ApiErrors from '../../ApiErrors'
import Can from 'src/layouts/components/acl/Can'
import { uploadFiles, uploadableResourceFileTypes } from 'src/services/file/file-service'
import { CardDetail } from 'src/views/components/custom/resources/Common'
import { getResourceSalarys, postResourceSalary, updateResourceSalary } from 'src/services/resources/salary'
import SalaryForm from 'src/views/components/forms/resources/Salary'
import { useTranslation } from 'react-i18next'
import { getDynamicDate } from 'src/views/components/forms/ethioCalendar/EthioCalendarUtils'

function Salary({ id, isProject }) {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [form, setForm] = useState(false)
  const { t, i18n } = useTranslation()

  const [{ data, loading, error }, refetch] = getResourceSalarys(id, page || 0, pageSize || 10)
  const [{ loading: postLoading, error: postError }, post] = postResourceSalary()
  const [{ loading: putLoading, error: putError }, put] = updateResourceSalary(selectedRow?.id)

  const columns = [
    {
      field: 'id',
      headerName: t('ID'),
      width: 85
      // renderCell: params => {
      //   return (
      //     <Typography
      //       variant='body1'
      //       sx={{ cursor: 'pointer' }}
      //       color='primary'
      //       onClick={() => {
      //         setSelectedRow(params.row)
      //         setShowDetail(true)
      //       }}
      //     >
      //       {params.row?.id.slice(0, 6)}...
      //     </Typography>
      //   )
      // }
    },
    {
      field: 'min_pay',
      headerName: t('Minimum pay'),
      width: '110',
      valueFormatter: ({ value }) => `$${value}`
    },
    {
      field: 'max_pay',
      headerName: t('Maximum pay'),
      width: '110',
      valueFormatter: ({ value }) => `$${value}`
    },
    { field: 'salary_type', headerName: t('Salary type'), width: '110' },
    {
      field: 'year',
      headerName: t('Date'),
      width: '150',
      renderCell: params => {
        return <Typography variant='body1'>{getDynamicDate(i18n, params.row.year).toDateString()}</Typography>
      }
    },
    // { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'status',
      headerName: t('Status'),
      minWidth: 130,
      renderCell: params => {
        return (
          <ModelAction
            model_id={params.row.id}
            model='construtionresourcesalary'
            title='Salary'
            editPermission={{
              action: 'register_resources',
              subject: 'resources'
            }}
            handleEdit={() => {
              setSelectedRow(() => params.row)
              setForm(true)
            }}
          />
        )
      }
    }
  ]

  const handleSubmit = async values => {
    const params = {
      resource_id: id,
      ...values
    }

    delete params.referenceFile

    if (selectedRow) {
      return put({ data: params }).then(async () => {
        if (values.referenceFile.length > 0) {
          return Promise.all(
            values.referenceFile.map(file => uploadFiles(file, uploadableResourceFileTypes.salary, selectedRow.id))
          ).then(() => {
            refetch()

            return true
          })
        }

        refetch()

        return true
      })
    }

    return post({ data: params }).then(async res => {
      if (values.referenceFile.length > 0) {
        return Promise.all(
          values.referenceFile.map(file => uploadFiles(file, uploadableResourceFileTypes.salary, res.data.id))
        ).then(() => {
          refetch()

          return true
        })
      }

      refetch()

      return true
    })
  }

  console.log(data)

  return (
    <Box display='flex' flexDirection='column'>
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
      <SalaryForm
        show={form}
        toggleDrawer={() => setForm(!form)}
        data={selectedRow}
        error={postError || putError}
        loading={postLoading || putLoading}
        handleFormSubmit={handleSubmit}
        title={t('Salary')}
      />
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ m: 2 }}>
            {t('Salary')}
          </Typography>

          {error && <ApiErrors error={error} />}
          {!error && showDetail ? (
            <CardDetail data={selectedRow} title='salary' fileType={uploadableResourceFileTypes.salary} />
          ) : desktop ? (
            <Box height={375} mt={4} overflow='auto'>
              <DataGrid
                rows={data ? data : []}
                columns={columns}
                loading={loading}
                // rowCount={data ? data.totalItems : 0}
                rowCount={0}
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
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}></Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Salary
