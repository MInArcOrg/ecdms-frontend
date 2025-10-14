import { CircularProgress } from '@mui/material'
import { getMatrixTree } from 'src/services/analytics/general'
import ApiErrors from 'src/views/components/ApiErrors'
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout'
import Obs from 'src/views/components/structure/OrgChart'

function MatrixTree() {
  const [{ data, loading, error }, getDta] = getMatrixTree('stakeholder')

  return (
    <StakeholderAnalyticsLayout>
      {loading && <CircularProgress sx={{ ml: '50%' }} />}
      {error && <ApiErrors error={error} />}
      {data ? <Obs data={data} showAvatar={true} /> : null}
    </StakeholderAnalyticsLayout>
  )
}

export default MatrixTree
