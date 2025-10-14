import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Icon } from '@iconify/react'
import dynamic from 'next/dynamic'
import { CardContent } from '@mui/material'
import { useEffect, useState } from 'react'

const MapView = dynamic(() => import('src/views/analytics/layouts/ProjectAnalyticsLayout/MapView'), {
  ssr: false
})

interface LocationCardProps {
  categories: { id: number; title: string }[]
  loading: boolean
  baseUrl: string
  isProject?: boolean
}

function LocationCard({ categories: propCategories, loading, baseUrl, isProject }: LocationCardProps) {
  const colors = ['blue', 'green', 'red', 'orange', 'violet', 'yellow', 'black', 'grey']
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [categories, setCategories] = useState(propCategories)
  const [filterColor, setFilterColor] = useState<string[]>([])
  const [removedCategories, setRemovedCategories] = useState<{ id: number; title: string }[]>([])

  useEffect(() => {
    if (propCategories?.length > 0) {
      const newColors = propCategories.map(() => colors[Math.floor(Math.random() * colors.length)])
      setCategories(propCategories)
      setSelectedColors(newColors)
      setFilterColor(newColors)
    }
  }, [propCategories])

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>Categories</Typography>

        <Box display='flex' gap={3} alignItems='center' flexWrap='wrap'>
          {loading && <Typography variant='subtitle1'>Loading...</Typography>}

          {!loading && propCategories?.length < 1 && (
            <Typography variant='subtitle1'>No Categories</Typography>
          )}

          {!loading &&
            propCategories.map((category, index) => (
              <Typography
                variant='subtitle1'
                key={category.id}
                display='flex'
                gap={1.5}
                alignItems='center'
              >
                <Icon
                  icon='mdi:square'
                  fontSize='15px'
                  color={selectedColors[index]}
                  cursor='pointer'
                  onClick={() => {
                    const isRemoved = removedCategories.some(c => c.id === category.id)

                    if (isRemoved) {
                      // Add back the category
                      const updatedRemoved = removedCategories.filter(c => c.id !== category.id)
                      setRemovedCategories(updatedRemoved)
                      setCategories([...categories, category])
                      setFilterColor([...filterColor, selectedColors[index]])
                    } else {
                      // Remove the category
                      const updatedCategories = categories.filter(c => c.id !== category.id)
                      setRemovedCategories([...removedCategories, category])
                      setCategories(updatedCategories)
                      setFilterColor(filterColor.filter(c => c !== selectedColors[index]))
                    }
                  }}
                />
                <span>
                  {removedCategories.some(c => c.id === category.id) ? (
                    <>{category.title}</>
                  ) : (
                    category.title
                  )}
                </span>
              </Typography>
            ))}
        </Box>

        <Box p={5}>
          <MapView
            categories={categories}
            colors={filterColor}
            baseUrl={baseUrl}
            catLoading={loading}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default LocationCard
