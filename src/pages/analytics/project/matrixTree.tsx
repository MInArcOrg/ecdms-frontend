import { useQuery } from '@tanstack/react-query'
import projectAnalticsService from 'src/services/analytics/project'

import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import LoadingPlaceholder from 'src/views/components/loader'
import Obs from 'src/views/components/structure/OrgChart'

function MatrixTree() {
  const { data, isLoading, error } = useQuery({
    queryKey: [],
    queryFn: async () => projectAnalticsService.getMatrixTree({})
  })
  return (
    <ProjectAnalyticsLayout>
      {isLoading && <LoadingPlaceholder />}
      {data ? <Obs data={data.payload} showAvatar={true} /> : null}
    </ProjectAnalyticsLayout>
  )
}

export default MatrixTree
