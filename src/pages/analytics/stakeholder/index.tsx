// ** Custom Components
import AnalyticsDashboard from 'src/views/analytics/General/AnalyticsDashboard';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

// ** Services
import stakeholderGeneralAnalyticsService from 'src/services/analytics/stakeholder';

const StakeholderAnalytics = () => {
  return (
    <AnalyticsDashboard
      module="stakeholder"
      Layout={StakeholderAnalyticsLayout}
      summaryService={stakeholderGeneralAnalyticsService}
    />
  );
};

export default StakeholderAnalytics;
