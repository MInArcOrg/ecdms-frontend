import { Icon } from '@iconify/react'
import { Box, CardContent, Drawer, Typography } from '@mui/material'
import DescCollapse from '../DescCollapse'
import { useTranslation } from 'react-i18next'
import { getDynamicDate } from 'src/views/components/forms/ethioCalendar/EthioCalendarUtils'

function PriceAndQuantityDetail({ show, toggleDrawer, title, data }) {
  const { t, i18n } = useTranslation()

  const FlexBox = ({ children }) => (
    <Box display='flex' flexWrap='wrap' mt={3} gap={2} alignItems='center'>
      {children}
    </Box>
  )

  return (
    <Drawer
      anchor='right'
      open={show}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            sm: '100%',
            md: '40%',
            lg: '30%'
          },
          boxSizing: 'border-box'
        }
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '1',
            alignItems: 'center',
            p: 3
          }}
        >
          <Typography variant='h6'>
            {title} {t('Details')}
          </Typography>
          <Icon
            icon='tabler:x'
            fontSize='1.4rem'
            cursor='pointer'
            onClick={() => {
              toggleDrawer()
            }}
          />
        </Box>
        <CardContent>
          <FlexBox>
            <Typography variant='h6' fontWeight='bold'>
              {t('Price')}:
            </Typography>
            <Typography variant='body1'>ETB {data?.unit_price}</Typography>
          </FlexBox>

          <FlexBox>
            <Typography variant='h6' fontWeight='bold'>
              {t('Quantity')}:
            </Typography>
            <Typography variant='body1'>
              {data?.quantity} {t('units')}
            </Typography>
          </FlexBox>

          <FlexBox>
            <Typography variant='h6' fontWeight='bold'>
              {t('Date')}:
            </Typography>
            <Typography variant='body1'>{getDynamicDate(i18n, data?.date).toDateString()}</Typography>
          </FlexBox>

          <FlexBox>
            <Typography variant='h6' fontWeight='bold'>
              {t('Data Source')}:
            </Typography>
            <Typography variant='body1'>{data.datasource}</Typography>
          </FlexBox>

          <Typography variant='h6' fontWeight='bold' mt={4}>
            {t('Type')}
          </Typography>
          <Box ml={3}>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Title')}:
              </Typography>
              <Typography variant='body1'>{data?.detailresourcetype?.title}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Description')}:
              </Typography>
              <DescCollapse desc={data?.detailresourcetype?.description} />
            </FlexBox>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Date')}:
              </Typography>
              <Typography variant='body1'>
                {getDynamicDate(i18n, data?.detailresourcetype?.createdAt).toDateString()}
              </Typography>
            </FlexBox>
          </Box>

          <Typography variant='h6' fontWeight='bold' mt={4}>
            {t('Brand')}
          </Typography>
          <Box ml={3}>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Title')}:
              </Typography>
              <Typography variant='body1'>{data?.resourcebrand?.title}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Description')}:
              </Typography>
              <DescCollapse desc={data?.resourcebrand?.description} />
            </FlexBox>
            <FlexBox>
              <Typography variant='body1' fontWeight='bold'>
                {t('Date')}:
              </Typography>
              <Typography variant='body1'>
                {getDynamicDate(i18n, data?.resourcebrand?.createdAt).toDateString()}
              </Typography>
            </FlexBox>
          </Box>
        </CardContent>
      </Box>
    </Drawer>
  )
}

export default PriceAndQuantityDetail
