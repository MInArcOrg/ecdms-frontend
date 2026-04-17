import { useQuery } from '@tanstack/react-query';
import resourceAnalticsService from 'src/services/analytics/resource';
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';

import LoadingPlaceholder from 'src/views/components/loader';
import Obs from 'src/views/components/structure/OrgChart';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

function MatrixTree() {
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  const dummyResponse = {
    payload: [
      { id: 'root', parentNodeId: null, name: 'Resources', total: 325, positionName: '' },

      { id: 'mat', parentNodeId: 'root', name: 'Construction Materials', total: 120, positionName: '' },
      { id: 'mat-cement', parentNodeId: 'mat', name: 'Cement & Concrete', total: 52, positionName: '' },
      { id: 'mat-brick', parentNodeId: 'mat', name: 'Bricks & Blocks', total: 28, positionName: '' },
      { id: 'mat-tiles', parentNodeId: 'mat', name: 'Ceramics & Tiles', total: 25, positionName: '' },
      { id: 'mat-add', parentNodeId: 'mat', name: 'Admixtures & Additives', total: 15, positionName: '' },

      { id: 'metal', parentNodeId: 'root', name: 'Steel & Metals', total: 78, positionName: '' },
      { id: 'metal-rebar', parentNodeId: 'metal', name: 'Rebar', total: 34, positionName: '' },
      { id: 'metal-struct', parentNodeId: 'metal', name: 'Structural Steel', total: 18, positionName: '' },
      { id: 'metal-sheet', parentNodeId: 'metal', name: 'Sheets & Pipes', total: 16, positionName: '' },
      { id: 'metal-fast', parentNodeId: 'metal', name: 'Fasteners', total: 10, positionName: '' },

      { id: 'agg', parentNodeId: 'root', name: 'Aggregates', total: 54, positionName: '' },
      { id: 'agg-sand', parentNodeId: 'agg', name: 'Sand', total: 22, positionName: '' },
      { id: 'agg-gravel', parentNodeId: 'agg', name: 'Gravel', total: 14, positionName: '' },
      { id: 'agg-crush', parentNodeId: 'agg', name: 'Crushed Stone', total: 12, positionName: '' },
      { id: 'agg-fill', parentNodeId: 'agg', name: 'Fill Material', total: 6, positionName: '' },

      { id: 'elec', parentNodeId: 'root', name: 'Electrical Materials', total: 36, positionName: '' },
      { id: 'elec-cable', parentNodeId: 'elec', name: 'Cables', total: 15, positionName: '' },
      { id: 'elec-trans', parentNodeId: 'elec', name: 'Transformers', total: 7, positionName: '' },
      { id: 'elec-switch', parentNodeId: 'elec', name: 'Switchgear', total: 8, positionName: '' },
      { id: 'elec-pole', parentNodeId: 'elec', name: 'Poles & Accessories', total: 6, positionName: '' },

      { id: 'fuel', parentNodeId: 'root', name: 'Fuel & Lubricants', total: 25, positionName: '' },
      { id: 'fuel-diesel', parentNodeId: 'fuel', name: 'Diesel', total: 11, positionName: '' },
      { id: 'fuel-petrol', parentNodeId: 'fuel', name: 'Petrol', total: 6, positionName: '' },
      { id: 'fuel-lube', parentNodeId: 'fuel', name: 'Lubricants', total: 5, positionName: '' },
      { id: 'fuel-gas', parentNodeId: 'fuel', name: 'Gas', total: 3, positionName: '' },

      { id: 'mach', parentNodeId: 'root', name: 'Machinery & Equipment', total: 12, positionName: '' }
    ]
  };

  const { data, isLoading } = useQuery({
    queryKey: ['resource-matrix-tree'],
    queryFn: async () => (dummyEnabled ? Promise.resolve(dummyResponse as any) : resourceAnalticsService.getMatrixTree({})),
    enabled: !dummyEnabled
  });

  const resolved = (dummyEnabled ? dummyResponse : data) as any;
  return (
    <ResourceAnalyticsLayout>
      {!dummyEnabled && isLoading && <LoadingPlaceholder />}
      {resolved ? <Obs data={resolved.payload} showAvatar={true} /> : null}
    </ResourceAnalyticsLayout>
  );
}

export default MatrixTree;
