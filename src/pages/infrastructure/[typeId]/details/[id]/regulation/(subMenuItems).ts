import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const regulationIds = {
  gridOperations: {
    gridOperations: 'GRID_OPERATIONS',
    electricGridControlCenterData: 'ELECTRIC_GRID_CONTROL_CENTER_DATA',
    electricGridControlCenterPerformanceAndMaintenance: 'ELECTRIC_GRID_CONTROL_CENTER_PERFORMANCE_AND_MAINTENANCE',
    electricGridControlCenterCyberSecurityData: 'ELECTRIC_GRID_CONTROL_CENTER_CYBER_SECURITY_DATA'
  },
  regulatoryAndEnvironmentalOversight: {
    regulatoryAndEnvironmentalOversight: 'REGULATORY_AND_ENVIRONMENTAL_OVERSIGHT',
    regulationAndPolicy: 'REGULATION_AND_POLICY',
    environmentalAndSocialImpact: 'ENVIRONMENTAL_AND_SOCIAL_IMPACT'
  },
  maintenanceAndReliability: {
    maintenanceAndReliability: 'MAINTENANCE_AND_RELIABILITY',
    reliabilityAndMaintenance: 'RELIABILITY_AND_MAINTENANCE'
  }
};

const subMenuItems = (id: string, typeId: string, module: string = "infrastructure"): DetailSubMenuItem[] => [
  {
    id: regulationIds.gridOperations.gridOperations,
    title: 'project.navigation.submenu.regulation.grid-operations.title',
    subItems: [
      {
        id: regulationIds.gridOperations.electricGridControlCenterData,
        title: 'project.navigation.submenu.regulation.grid-operations.electric-grid-control-center-data',
        path: `/${module}/${typeId}/details/${id}/regulation/grid-operations/electric-grid-control-center-data`,
        model: 'electricgridcontrolcenterdata',
        apiRoute: 'electric-grid-control-center-data'
      },
      {
        id: regulationIds.gridOperations.electricGridControlCenterPerformanceAndMaintenance,
        title: 'project.navigation.submenu.regulation.grid-operations.electric-grid-control-center-performance-and-maintenance',
        path: `/${module}/${typeId}/details/${id}/regulation/grid-operations/electric-grid-control-center-performance-and-maintenance`,
        model: 'electricgridcontrolcenterperformanceandmaintenance',
        apiRoute: 'electric-grid-control-center-performance-and-maintenance'
      },
      {
        id: regulationIds.gridOperations.electricGridControlCenterCyberSecurityData,
        title: 'project.navigation.submenu.regulation.grid-operations.electric-grid-control-center-cyber-security-data',
        path: `/${module}/${typeId}/details/${id}/regulation/grid-operations/electric-grid-control-center-cyber-security-data`,
        model: 'electricgridcontrolcentercybersecuritydata',
        apiRoute: 'electric-grid-control-center-cyber-security-data'
      }
    ]
  },
  {
    id: regulationIds.regulatoryAndEnvironmentalOversight.regulatoryAndEnvironmentalOversight,
    title: 'project.navigation.submenu.regulation.regulatory-and-environmental-oversight.title',
    subItems: [
      {
        id: regulationIds.regulatoryAndEnvironmentalOversight.regulationAndPolicy,
        title: 'project.navigation.submenu.regulation.regulatory-and-environmental-oversight.regulation-and-policy',
        path: `/${module}/${typeId}/details/${id}/regulation/regulatory-and-environmental-oversight/regulation-and-policy`,
        model: 'regulationandpolicy',
        apiRoute: 'regulation-and-policies'
      },
      {
        id: regulationIds.regulatoryAndEnvironmentalOversight.environmentalAndSocialImpact,
        title: 'project.navigation.submenu.regulation.regulatory-and-environmental-oversight.environmental-and-social-impact',
        path: `/${module}/${typeId}/details/${id}/regulation/regulatory-and-environmental-oversight/environmental-and-social-impact`,
        model: 'environmentalandsocialimpact',
        apiRoute: 'environmental-and-social-impacts'
      }
    ]
  },
  {
    id: regulationIds.maintenanceAndReliability.maintenanceAndReliability,
    title: 'project.navigation.submenu.regulation.maintenance-and-reliability.title',
    subItems: [
      {
        id: regulationIds.maintenanceAndReliability.reliabilityAndMaintenance,
        title: 'project.navigation.submenu.regulation.maintenance-and-reliability.reliability-and-maintenance',
        path: `/${module}/${typeId}/details/${id}/regulation/maintenance-and-reliability/reliability-and-maintenance`,
        model: 'reliabilityandmaintenance',
        apiRoute: 'reliability-and-maintenance'
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
