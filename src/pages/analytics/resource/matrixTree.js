import { CircularProgress } from '@mui/material'
import { getMatrixTree } from 'src/services/analytics/general'
import ApiErrors from 'src/views/components/ApiErrors'
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout'
import Obs from 'src/views/components/structure/OrgChart'

function MatrixTree() {
  const [{ data, loading, error }, getDta] = getMatrixTree('construction-resource')

  return (
    <ResourceAnalyticsLayout>
      {loading && <CircularProgress sx={{ ml: '50%' }} />}
      {error && <ApiErrors error={error} />}
      {data ? <Obs data={data} showAvatar={true} /> : null}
    </ResourceAnalyticsLayout>
  )
}

export default MatrixTree
