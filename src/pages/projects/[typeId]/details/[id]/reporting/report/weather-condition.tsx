import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';
import WeatherConditionList from 'src/views/pages/projects/detail/project-weather-condition';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.weatherCondition);

const WhetherConditionPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.weatherCondition);
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.reporting}
      activeSubMenuId={projectReportingIds.report.weatherCondition}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <WeatherConditionList projectId={String(id)} typeId={String(typeId)}  model={menuItem?.model||''}/>
    </ProjectLayout>
  );
};

WhetherConditionPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default WhetherConditionPage;
