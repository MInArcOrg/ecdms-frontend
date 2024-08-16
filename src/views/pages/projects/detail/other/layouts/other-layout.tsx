import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box, Card, Grid } from '@mui/material'
import ProjectLayout from 'src/views/pages/projects/detail/project-layout'
import OtherSubMenu from 'src/views/pages/projects/detail/other/layouts/others-sub-menu'

interface OtherLayoutProps {
  activeMenu: number
  activeSubMenu: number
  subMenuItems: (baseUrl: string) => any[]
  children: ReactNode
  activeType:number,
  baseUrl:string,
}

const OtherLayout: React.FC<OtherLayoutProps> = ({
  activeMenu,
  activeSubMenu,
  subMenuItems,
  children,
  activeType,
  baseUrl
}) => {
  const router = useRouter()
  const { typeId } = router.query

  return (
    <ProjectLayout activeMenu={activeMenu}>
      <Box display='flex' flexDirection='column' gap={1} paddingTop={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3.4}>
            <Card>
              <OtherSubMenu
                typeId={String(typeId)}
                subMenuItems={subMenuItems(baseUrl)}
                activeSubMenu={activeSubMenu}
                setActiveType={(path) => {
                  router.push(path)
                }}
                activeType={activeType}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8.6}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </ProjectLayout>
  )
}

export default OtherLayout
