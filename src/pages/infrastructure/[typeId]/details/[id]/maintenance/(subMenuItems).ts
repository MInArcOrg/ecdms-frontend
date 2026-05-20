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
    drainageMaintenance: 'DRAINAGE_MAINTENANCE'
  }
};

const subMenuItems = (id: string, typeId: string, module: string = "projects"): DetailSubMenuItem[] => [
  {
    id: projectMaintenanceIds.quality.quality,
    title: 'project.navigation.submenu.maintenance.quality.title',
    subItems: [
      {
        id: projectMaintenanceIds.quality.qualityControl,
        title: 'project.navigation.submenu.maintenance.quality.quality-control',
        path: `/${module}/${typeId}/details/${id}/maintenance/quality/quality-control`,
        model: 'roadprojectqualitycontrol',
        apiRoute: 'road-project-quality-controls'
      },
      {
        id: projectMaintenanceIds.quality.drainageEnvironmentalData,
        title: 'project.navigation.submenu.maintenance.quality.drainage-environmental-data',
        path: `/${module}/${typeId}/details/${id}/maintenance/quality/drainage-environmental-data`,
        model: 'environmentaldata',
        apiRoute: 'drainage-environmental-data'
      },
      {
        id: projectMaintenanceIds.quality.drainageAssessment,
        title: 'project.navigation.submenu.maintenance.quality.drainage-assessment',
        path: `/${module}/${typeId}/details/${id}/maintenance/quality/drainage-assessment`,
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
        path: `/${module}/${typeId}/details/${id}/maintenance/maintenance/road-maintenance-activities`,
        model: 'roadmaintenanceactivity',
        apiRoute: 'road-maintenance-activities'
      },
      {
        id: projectMaintenanceIds.maintenance.maintenanceHistory,
        title: 'project.navigation.submenu.maintenance.maintenance.maintenance-history',
        path: `/${module}/${typeId}/details/${id}/maintenance/maintenance/maintenance-history`,
        model: 'maintenancehistory',
        apiRoute: 'maintenance-histories'
      },
      // {
      //   id: projectMaintenanceIds.maintenance.trafficMaintenance,
      //   title: 'project.navigation.submenu.maintenance.maintenance.traffic-maintenance',
      //   path: `/${module}/${typeId}/details/${id}/maintenance/maintenance/traffic-maintenance`,
      //   model: 'trafficmaintenance',
      //   apiRoute: 'traffic-maintenance'
      // },
      {
        id: projectMaintenanceIds.maintenance.drainageMaintenance,
        title: 'project.navigation.submenu.maintenance.maintenance.drainage-maintenance',
        path: `/${module}/${typeId}/details/${id}/maintenance/maintenance/drainage-maintenance`,
        model: 'drainagemaintenance',
        apiRoute: 'drainage-maintenances'
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