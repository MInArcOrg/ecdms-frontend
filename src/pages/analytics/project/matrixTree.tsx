import { useQuery } from '@tanstack/react-query';
import projectAnalticsService from 'src/services/analytics/project/project';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';
import LoadingPlaceholder from 'src/views/components/loader';
import Obs from 'src/views/components/structure/OrgChart';

function MatrixTree() {
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  const dummyResponse = {
    payload: [
      { id: 'root', parentNodeId: null, name: 'Projects', total: 52, positionName: '' },
      { id: 'p-1', parentNodeId: 'root', name: 'Transportation', total: 18, positionName: '' },
      { id: 'p-2', parentNodeId: 'root', name: 'Water & Sanitation', total: 14, positionName: '' },
      { id: 'p-3', parentNodeId: 'root', name: 'Energy', total: 20, positionName: '' },
      { id: 'p-1-1', parentNodeId: 'p-1', name: 'Roads', total: 10, positionName: '' },
      { id: 'p-1-2', parentNodeId: 'p-1', name: 'Rail', total: 8, positionName: '' }
    ]
  };

  const { data, isLoading } = useQuery({
    queryKey: ['project-matrix-tree'],
    queryFn: async () => (dummyEnabled ? Promise.resolve(dummyResponse as any) : projectAnalticsService.getMatrixTree({})),
    enabled: !dummyEnabled
  });

  const resolved = (dummyEnabled ? dummyResponse : data) as any;
  return (
    <ProjectAnalyticsLayout>
      {!dummyEnabled && isLoading && <LoadingPlaceholder />}
      {resolved ? <Obs data={resolved.payload} showAvatar={true} /> : null}
    </ProjectAnalyticsLayout>
  );
}

export default MatrixTree;
