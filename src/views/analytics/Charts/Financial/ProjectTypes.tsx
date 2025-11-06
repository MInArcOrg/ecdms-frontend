import React, { useMemo } from 'react'
import {
  Box,
  Card,
  Typography,
  CardHeader,
  CardContent,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText
} from '@mui/material'
import { styled } from '@mui/material/styles'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { formatCurrency } from 'src/utils/formatter/currency'

// ** Styled Scrollbar
const PerfectScrollbar = styled(PerfectScrollbarComponent)<{ maxHeight: string }>(({ maxHeight }) => ({
  maxHeight
}))

interface ProjectTypesProps {
  rawData: any[]
  title: string
  maxHeight?: string
  activeType: any
  setActiveType: (type: any) => void
  loading?: boolean
}

const ProjectTypes = React.memo(
  ({ rawData = [], title, maxHeight = '18.6rem', activeType, setActiveType, loading }: ProjectTypesProps) => {
    // ✅ Map and enrich data locally
    const data = useMemo(() => {
      return rawData.map((item: any) => ({
        ...item,
        progress: Math.floor(Math.random() * 100),
        percentage: `${Math.floor(Math.random() * 50)}%`,
        progressColor: 'primary',
        amount: formatCurrency(Math.floor(Math.random() * 1_000_000))
      }))
    }, [rawData])

    const ScrollWrapper = useMemo(
      () =>
        ({ children, hidden }: { children: React.ReactNode; hidden?: boolean }) => {
          if (hidden) {
            return (
              <Box sx={{ maxHeight: maxHeight, overflowY: 'auto', overflowX: 'hidden' }}>
                {children}
              </Box>
            )
          }
          return (
            <PerfectScrollbar maxHeight={maxHeight} options={{ wheelPropagation: false, suppressScrollX: false }}>
              {children}
            </PerfectScrollbar>
          )
        },
      [maxHeight]
    )

    return (
      <Card>
        <CardHeader title={title} subheaderTypographyProps={{ sx: { mt: '0 !important' } }} />
        {loading ? (
          <Box sx={{ height: maxHeight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <CardContent>
            <ScrollWrapper hidden={data?.length < 4}>
              {data?.map((item) => (
                <TypeListItem key={item.id} item={item} activeType={activeType} setActiveType={setActiveType} />
              ))}
            </ScrollWrapper>
          </CardContent>
        )}
      </Card>
    )
  }
)

const TypeListItem = React.memo(
  ({ item, activeType, setActiveType }: { item: any; activeType: any; setActiveType: (type: any) => void }) => {
    const isSelected = item.id === activeType?.id
    return (
      <ListItem sx={{ padding: 0 }} disablePadding>
        <ListItemButton
          sx={{
            borderRadius: '0.5rem',
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              '&:hover': { backgroundColor: 'primary.light' }
            }
          }}
          selected={isSelected}
          onClick={() => setActiveType(item)}
        >
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: isSelected ? '#fff' : '',
                wordWrap: 'break-word',
                maxWidth: '80%'
              }
            }}
            primary={item.title?.length > 17 ? `${item.title.substring(0, 17)}...` : item.title}
            secondary={item.amount}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Typography sx={{ mr: 2, fontWeight: 500, color: isSelected ? '#fff' : '' }}>
              {item.percentage}
            </Typography>
            <Box sx={{ display: 'flex', position: 'relative' }}>
              <CircularProgress
                size={28}
                value={100}
                thickness={5}
                variant="determinate"
                sx={{ position: 'absolute', color: (theme) => theme.palette.customColors.trackBg }}
              />
              <CircularProgress
                size={28}
                thickness={5}
                value={item.progress}
                variant="determinate"
                color={item.progressColor}
              />
            </Box>
          </Box>
        </ListItemButton>
      </ListItem>
    )
  }
)

export default ProjectTypes
