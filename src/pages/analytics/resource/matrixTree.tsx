import { useQuery } from '@tanstack/react-query';
import resourceAnalticsService from 'src/services/analytics/resource';
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';

import LoadingPlaceholder from 'src/views/components/loader';
import Obs from 'src/views/components/structure/OrgChart';

function MatrixTree() {
  const { data, isLoading, error } = useQuery({
    queryKey: [],
    queryFn: async () => resourceAnalticsService.getMatrixTree({})
  });
  return (
    <ResourceAnalyticsLayout>
      {isLoading && <LoadingPlaceholder />}
      {data ? <Obs data={data.payload} showAvatar={true} /> : null}
    </ResourceAnalyticsLayout>
  );
}

export default MatrixTree;
