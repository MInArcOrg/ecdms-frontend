import { useQuery } from '@tanstack/react-query';
import stakeholderAnalticsService from 'src/services/analytics/stakeholder';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

import LoadingPlaceholder from 'src/views/components/loader';
import Obs from 'src/views/components/structure/OrgChart';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

function MatrixTree() {
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);

  const dummyResponse = {
    payload: [
      { id: 'root', parentNodeId: null, name: 'Stakeholders', total: 238, positionName: '' },

      { id: 'assoc', parentNodeId: 'root', name: 'Associations', total: 0, positionName: '' },
      { id: 'assoc-business', parentNodeId: 'assoc', name: 'Business Association', total: 0, positionName: '' },
      { id: 'assoc-prof', parentNodeId: 'assoc', name: 'Professional Association', total: 0, positionName: '' },
      { id: 'assoc-special', parentNodeId: 'assoc', name: 'Special Interest Association', total: 0, positionName: '' },
      { id: 'assoc-trade', parentNodeId: 'assoc', name: 'Trade Association', total: 0, positionName: '' },

      { id: 'consult', parentNodeId: 'root', name: 'Consultants', total: 110, positionName: '' },
      { id: 'consult-eng', parentNodeId: 'consult', name: 'Engineering Consulting', total: 48, positionName: '' },
      { id: 'consult-fin', parentNodeId: 'consult', name: 'Financial Consulting', total: 18, positionName: '' },
      { id: 'consult-mgt', parentNodeId: 'consult', name: 'Management Consulting', total: 22, positionName: '' },
      { id: 'consult-ict', parentNodeId: 'consult', name: 'ICT Consulting', total: 22, positionName: '' },

      { id: 'contract', parentNodeId: 'root', name: 'Contractor', total: 128, positionName: '' },
      { id: 'contract-general', parentNodeId: 'contract', name: 'General Contractor', total: 56, positionName: '' },
      { id: 'contract-special', parentNodeId: 'contract', name: 'Specialized Contractor', total: 38, positionName: '' },
      { id: 'contract-maint', parentNodeId: 'contract', name: 'Maintenance Contractor', total: 20, positionName: '' },
      { id: 'contract-supply', parentNodeId: 'contract', name: 'Supply & Installation', total: 14, positionName: '' },

      { id: 'edu', parentNodeId: 'root', name: 'Education Institutions', total: 0, positionName: '' },
      { id: 'msme', parentNodeId: 'root', name: 'MSMEs', total: 0, positionName: '' },
      { id: 'other', parentNodeId: 'root', name: 'Others', total: 0, positionName: '' },
      { id: 're', parentNodeId: 'root', name: 'Real estate developer', total: 0, positionName: '' },
      { id: 'reg', parentNodeId: 'root', name: 'Regulatory Body', total: 0, positionName: '' }
    ]
  };

  const { data, isLoading } = useQuery({
    queryKey: ['stakeholder-matrix-tree'],
    queryFn: async () => (dummyEnabled ? Promise.resolve(dummyResponse as any) : stakeholderAnalticsService.getMatrixTree({})),
    enabled: !dummyEnabled
  });

  const resolved = (dummyEnabled ? dummyResponse : data) as any;
  return (
    <StakeholderAnalyticsLayout>
      {!dummyEnabled && isLoading && <LoadingPlaceholder />}
      {resolved ? <Obs data={resolved.payload} showAvatar={true} /> : null}
    </StakeholderAnalyticsLayout>
  );
}

export default MatrixTree;
