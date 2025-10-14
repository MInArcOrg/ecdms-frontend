import { Box, Card, CardContent, Divider, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import DetailMenu from './DetailMenu.jsx'
import { menuItems } from './tabs'

function StakeholderAnalyticsLayout({ toggleForm, activeMenu, activeSubMenu, subMenuItems, children }) {
  const router = useRouter()
  const {} = router.query

  return (
    <Box>
      <DetailMenu
        menuItems={menuItems()}
        activeMenu={router.pathname}
        setActiveMenu={path => {
          router.push(path)
        }}
      />
      <Box display='flex' flexDirection='column' gap={1} paddingTop={5}>
        <Grid item md={12} xs={12}>
          {children}
        </Grid>
      </Box>
    </Box>
  )
}

export default StakeholderAnalyticsLayout
