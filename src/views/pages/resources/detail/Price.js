import { Icon } from '@iconify/react'
import { Card, CardContent, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import PriceForm from '../../forms/resources/PriceForm'
import {
  getPriceAndQuantity,
  getProjectPriceAndQuantity,
  postPriceAndQuantity,
  updatePriceAndQuantity
} from 'src/services/resources/price'
import ModelAction from '../model-actions'
import ApiErrors from '../../ApiErrors'
import Can from 'src/layouts/components/acl/Can'
import PriceAndQuantityDetail from './PriceAndQuantityDetail'
import { useTranslation } from 'react-i18next'

function Price({ id, isProject, resourceId }) {
  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const [selectedRow, setSelectedRow] = useState(null)
  const [showDetail, setShowDetail] = useState(false)
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const { t } = useTranslation()
  const [{ data: prices, loading, error }, getData] = getPriceAndQuantity(id, page || 0, pageSize || 10)

  const [{ data: projectPrices, loading: projectLoading, error: projectError }, getProjectData] =
    getProjectPriceAndQuantity(id, page || 0, pageSize || 10)
  const [{ loading: postLoading, error: postError }, postData] = postPriceAndQuantity()
  const [{ loading: putLoading, error: putError }, putData] = updatePriceAndQuantity(selectedRow?.id)

  const [form, setForm] = useState(false)

  const columns = [
    {
      field: 'id',
      width: 80,
      headerName: t('ID'),
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
            {params.row?.id}
          </Typography>
        )
      }
    },
    {
      field: 'brand',
      headerName: t('Brand'),
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
            {params.row?.resourcebrand?.title}
          </Typography>
        )
      }
    },
    {
      field: 'type',
      headerName: t('Type'),
      renderCell: params => {
        return <Typography variant='body1'>{params.row?.detailresourcetype?.title}</Typography>
      }
    },
    {
      field: 'unit_price',
      headerName: t('Unit Price'),
      type: 'number',
      valueFormatter: ({ value }) => `$${value}`
    },
    {
      field: 'quantity',
      headerName: t('Quantity'),
      type: 'number',
      valueFormatter: ({ value }) => `${value} units`
    },
    {
      field: 'status',
      width: 150,
      headerName: t('Status'),
      renderCell: params => {
        return (
          <ModelAction
            model_id={params.row.id}
            model='construtionresourcequantityprice'
            title='Resource Quantity & Unit Price'
            editPermission={{
              action: 'register_resource',
              subject: 'resource'
            }}
            handleEdit={() => {
              setSelectedRow(params.row)
              setForm(true)
            }}
          />
        )
      }
    }
  ]

  useEffect(() => {
    if (id) {
      if (isProject) {
        getProjectData()

        return
      }
      getData()

      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, pageSize])

  const handleSubmit = async values => {
    const param = {
      resourcebrand_id: values.brand.id,
      detailresourcetype_id: values.type.id,
      resource_id: isProject ? resourceId : id,
      unit_price: Number(values.unit_price),
      quantity: Number(values.quantity),
      store_address: values.store_address,
      date: values.date,
      datasource: values.data_source,
      project_id: isProject ? id : null
    }

    if (selectedRow) {
      return putData({ data: param }).then(() => {
        if (isProject) {
          getProjectData()
          setForm(false)

          return true
        }
        getData()
        setForm(false)

        return true
      })
    }

    return postData({ data: param })
      .then(() => {
        if (isProject) {
          getProjectData()
          setForm(false)

          return
        }
        getData()
        setForm(false)

        return true
      })
      .catch(err => {
        console.log(err)

        return false
      })
  }
  const data = isProject ? projectPrices?.data : prices?.data

  const PriceCard = ({ data, setSelectedRow, setForm }) => {
    const price = data

    return (
      <Card>
        <CardContent
          onClick={() => {
            setSelectedRow(price)
            setShowDetail(true)
          }}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant='body1'>
            <strong>{t('Brand')}:</strong> {price.resourcebrand?.title}
          </Typography>
          <Typography variant='body1'>
            <strong>{t('Type')}:</strong> {price.detailresourcetype?.title}
          </Typography>
          <Typography variant='body1'>
            <strong>{t('Unit Price')}:</strong> ${price.unit_price}
          </Typography>
          <Typography variant='body1'>
            <strong>{t('Quantity')}:</strong> {price.quantity} {t('units')}
          </Typography>
        </CardContent>
        <Box justifyContent='end' mx={3} mb={2} display='flex'>
          <ModelAction
            model_id={price.id}
            model='construtionresourcequantityprice'
            title='Resource Quantity & Unit Price'
            editPermission={{
              action: 'register_resource',
              subject: 'resource'
            }}
            handleEdit={() => {
              setSelectedRow(price)
              setForm(true)
            }}
          />
        </Box>
      </Card>
    )
  }

  return (
    <Box display='flex' flexDirection='column'>
      {form && (
        <PriceForm
          show={form}
          id={isProject ? resourceId : id}
          data={selectedRow}
          toggleDrawer={setForm}
          title={t('Unit Price & Quantity')}
          handleFormSubmit={handleSubmit}
          error={postError || putError || projectError}
          loading={postLoading || putLoading || projectLoading}
        />
      )}
      {showDetail && (
        <PriceAndQuantityDetail
          show={showDetail}
          data={selectedRow}
          toggleDrawer={() => setShowDetail(!showDetail)}
          title={t('Unit Price & Quantity')}
        />
      )}
      <Can do='register_resources' on='resources'>
        <Icon
          icon='mdi:plus'
          fontSize='1.8rem'
          cursor='pointer'
          style={{ alignSelf: 'end' }}
          onClick={() => {
            setSelectedRow(null)
            setForm(true)
          }}
        />
      </Can>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ m: 2 }}>
            {t('Unit Prices and Quantities')}
          </Typography>

          {error && <ApiErrors error={error} />}
          {!error && desktop ? (
            <Box height={375} mt={4} overflow='auto'>
              <DataGrid
                rows={prices ? prices.data : projectPrices ? projectPrices.data : []}
                columns={columns}
                loading={loading || projectLoading}
                rowCount={prices ? prices.totalItems : projectPrices ? projectPrices.totalItems : 0}
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
              {data?.map((price, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <PriceCard data={price} setForm={setForm} setSelectedRow={setSelectedRow} />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Price
