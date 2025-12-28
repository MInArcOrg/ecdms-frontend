// ** Custom Components
import AnalyticsDashboard from 'src/views/analytics/General/AnalyticsDashboard';
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

// ** Services
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';

const ProjectAnalytics = () => {
  return (
    <AnalyticsDashboard
      module="project"
      Layout={ProjectAnalyticsLayout}
      summaryService={projectGeneralAnalyticsService}
    />
  );
};

export default ProjectAnalytics;
