import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectMaintenanceIds = {
  quality: {
    quality: 'QUALITY',
    qualityControl: 'QUALITY_CONTROL',
    drainageEnvironmentalData: 'DRAINAGE_ENVIRONMENTAL_DATA',
    drainageAssessment: 'DRAINAGE_ASSESSMENT'
  },
  maintenance: {
    maintenance: 'MAINTENANCE',
    roadMaintenance: 'ROAD_MAINTENANCE_ACTIVITIES',
    maintenanceHistory: 'MAINTENANCE_HISTORY',
    trafficMaintenance: 'TRAFFIC_MAINTENANCE',
    drainageMaintenanceData: 'DRAINAGE_MAINTENANCE_DATA'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectMaintenanceIds.quality.quality,
    title: 'project.navigation.submenu.maintenance.quality.title',
    subItems: [
      {
        id: projectMaintenanceIds.quality.qualityControl,
        title: 'project.navigation.submenu.maintenance.quality.quality-control',
        path: `/projects/${typeId}/details/${id}/maintenance/quality/quality-control`,
        model: 'roadprojectqualitycontrol',
        apiRoute: 'road-project-quality-controls'
      },
      {
        id: projectMaintenanceIds.quality.drainageEnvironmentalData,
        title: 'project.navigation.submenu.maintenance.quality.drainage-environmental-data',
        path: `/projects/${typeId}/details/${id}/maintenance/quality/drainage-environmental-data`,
        model: 'environmentaldata',
        apiRoute: 'environmental-data'
      },
      {
        id: projectMaintenanceIds.quality.drainageAssessment,
        title: 'project.navigation.submenu.maintenance.quality.drainage-assessment',
        path: `/projects/${typeId}/details/${id}/maintenance/quality/drainage-assessment`,
        model: 'drainageassessment',
        apiRoute: 'drainage-assessments'
      }
    ]
  },
  {
    id: projectMaintenanceIds.maintenance.maintenance,
    title: 'project.navigation.submenu.maintenance.maintenance.title',
    subItems: [
      {
        id: projectMaintenanceIds.maintenance.roadMaintenance,
        title: 'project.navigation.submenu.maintenance.maintenance.road-maintenance-activities',
        path: `/projects/${typeId}/details/${id}/maintenance/maintenance/road-maintenance-activities`,
        model: 'roadmaintenanceactivity',
        apiRoute: 'road-maintenance-activities'
      },
      {
        id: projectMaintenanceIds.maintenance.maintenanceHistory,
        title: 'project.navigation.submenu.maintenance.maintenance.maintenance-history',
        path: `/projects/${typeId}/details/${id}/maintenance/maintenance/maintenance-history`,
        model: 'maintenancehistory',
        apiRoute: 'maintenance-histories'
      },
      {
        id: projectMaintenanceIds.maintenance.trafficMaintenance,
        title: 'project.navigation.submenu.maintenance.maintenance.traffic-maintenance',
        path: `/projects/${typeId}/details/${id}/maintenance/maintenance/traffic-maintenance`,
        model: 'trafficmaintenance',
        apiRoute: 'traffic-maintenance'
      },
      {
        id: projectMaintenanceIds.maintenance.drainageMaintenanceData,
        title: 'project.navigation.submenu.maintenance.maintenance.drainage-maintenance-data',
        path: `/projects/${typeId}/details/${id}/maintenance/maintenance/drainage-maintenance-data`,
        model: 'drainagemaintenancedata',
        apiRoute: 'drainage-maintenance-data'
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
