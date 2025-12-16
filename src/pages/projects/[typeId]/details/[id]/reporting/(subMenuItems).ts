import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectReportingIds = {
  plan: {
    plan: 'PLAN'
  },
  report: {
    report: 'REPORT',
    actualStatus: 'ACTUAL_STATUS',
    weatherCondition: 'WEATHER_CONDITION',
    claim: 'CLAIM',
    challenges: 'CHALLENGES',
    qualityInspection: 'QUALITY_INSPECTION',
    sitePictures: 'SITE_PICTURES'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectReportingIds.plan.plan,
    title: 'project.navigation.submenu.reporting.plan.title',
    subItems: [
      {
        id: projectReportingIds.plan.plan,
        title: 'project.navigation.submenu.reporting.plan.plan',
        path: `/projects/${typeId}/details/${id}/reporting/plan/plan`
      }
    ]
  },
  {
    id: projectReportingIds.report.report,
    title: 'project.navigation.submenu.reporting.report.title',
    subItems: [
      {
        id: projectReportingIds.report.actualStatus,
        title: 'project.navigation.submenu.reporting.report.actual-status',
        path: `/projects/${typeId}/details/${id}/reporting/report/actual-status`
      },
      {
        id: projectReportingIds.report.weatherCondition,
        title: 'project.navigation.submenu.reporting.report.weather-condition',
        path: `/projects/${typeId}/details/${id}/reporting/report/weather-condition`,
        model: 'weathercondition',
        action: 'view'
      },
      {
        id: projectReportingIds.report.claim,
        title: 'project.navigation.submenu.reporting.report.claim',
        path: `/projects/${typeId}/details/${id}/reporting/report/claim`,
        
      },
      {
        id: projectReportingIds.report.challenges,
        title: 'project.navigation.submenu.reporting.report.challenges',
        path: `/projects/${typeId}/details/${id}/reporting/report/challenges`,
        model: 'projectchallenge',
        action: 'view'
      },
      {
        id: projectReportingIds.report.qualityInspection,
        title: 'project.navigation.submenu.reporting.report.quality-inspection',
        path: `/projects/${typeId}/details/${id}/reporting/report/quality-inspection`
      },
      {
        id: projectReportingIds.report.sitePictures,
        title: 'project.navigation.submenu.reporting.report.site-pictures',
        path: `/projects/${typeId}/details/${id}/reporting/report/site-pictures`
      }
    ]
  }
];
export const findSubMenuItem = (items: DetailSubMenuItem[], id: string) => {
  for (const item of items) {
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.id === id) return subItem;
      }
    }
  }
  return undefined;
};

export default subMenuItems;
