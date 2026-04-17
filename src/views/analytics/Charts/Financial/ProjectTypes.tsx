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
import { MasterCategory, MasterType } from 'src/types/master/master-types'

const hashString = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0
  return Math.abs(hash)
}

const mulberry32 = (seed: number) => {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let x = Math.imul(t ^ (t >>> 15), t | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

// ** Styled Scrollbar
const PerfectScrollbar = styled(PerfectScrollbarComponent)<{ maxHeight: string }>(({ maxHeight }) => ({
  maxHeight
}))

interface ProjectTypesProps {
  rawData: MasterType[] | MasterCategory[],
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
      const itemsWithAmount = rawData.map((item: any) => {
        const seed = hashString(`${item?.id || ''}:${item?.title || ''}:${title}`)
        const r = mulberry32(seed)
        const amountNumber = typeof item?.amountNumber === 'number' ? item.amountNumber : 75_000 + Math.round(r() * 1_250_000)
        return { item, amountNumber, seed }
      })

      const total = itemsWithAmount.reduce((sum, x) => sum + x.amountNumber, 0) || 1

      return itemsWithAmount.map(({ item, amountNumber, seed }) => {
        const r = mulberry32(seed + 11)
        const percentageValue = Math.max(1, Math.min(99, Math.round((amountNumber / total) * 100)))
        const progressValue = Math.max(8, Math.min(95, Math.round(percentageValue * (0.75 + r() * 0.5))))

        return {
          ...item,
          amountNumber,
          progress: typeof item?.progress === 'number' ? item.progress : progressValue,
          percentage: typeof item?.percentage === 'string' ? item.percentage : `${percentageValue}%`,
          progressColor: item?.progressColor || 'primary',
          amount: typeof item?.amount === 'string' ? item.amount : formatCurrency(amountNumber)
        }
      })
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
