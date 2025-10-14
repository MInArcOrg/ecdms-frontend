import { useQuery } from '@tanstack/react-query'
import stakeholderAnalticsService from 'src/services/analytics/stakeholder'
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout'

import LoadingPlaceholder from 'src/views/components/loader'
import Obs from 'src/views/components/structure/OrgChart'

function MatrixTree() {
  const { data, isLoading, error } = useQuery({
    queryKey: [],
    queryFn: async () => stakeholderAnalticsService.getMatrixTree({})
  })
  return (
    <StakeholderAnalyticsLayout>
      {isLoading && <LoadingPlaceholder />}
      {data ? <Obs data={data.payload} showAvatar={true} /> : null}
    </StakeholderAnalyticsLayout>
  )
}

export default MatrixTree
