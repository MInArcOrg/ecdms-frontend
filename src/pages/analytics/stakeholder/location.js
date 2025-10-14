import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategories, getTypes } from 'src/store/master/stakeholders'
import LocationCard from 'src/views/analytics/LocationCard'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'

function Location() {
  const store = useSelector(state => state.masterStakeholder)
  const dispatch = useDispatch()
  const [types, setTypes] = useState([])
  const [activeType, setActiveType] = useState(null)

  useEffect(() => {
    if (!store?.types?.length) dispatch(getTypes())

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (store?.activeType && store?.types?.length > 0) {
      setTypes(
        store.types.map(type => ({
          id: type.id,
          progress: Math.floor(Math.random() * 50),
          percentage: Math.floor(Math.random() * 50) + '%',
          title: type.title,
          progressColor: 'primary',
          amount: Math.floor(Math.random() * 1000000) + ' ETB'
        }))
      )
    }

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.types])

  useEffect(() => {
    if (types.length > 0) {
      !activeType && setActiveType(types[0])
    }

    if (activeType) {
      dispatch(getCategories(activeType.id))
    }

    return () => { }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types, activeType])

  return (
    <StakeholderAnalyticsLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={3}>
              <ProjectTypes
                data={types || []}
                title='Types'
                maxHeight='100%'
                activeType={activeType}
                setActiveType={setActiveType}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <LocationCard store={store} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </StakeholderAnalyticsLayout>
  )
}

export default Location
