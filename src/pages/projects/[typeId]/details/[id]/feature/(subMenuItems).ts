import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectFeatureIds = {
  accessories: {
    accessories: 'ACCESSORIES',
    accessoriesBasic: 'ACCESSORIES_BASIC',
    roadSafetyFeatures: 'ROAD_SAFETY_FEATURES',
    roadDrainage: 'ROAD_DRAINAGE',
    drainageGeotechnicalData: 'DRAINAGE_GEOTECHNICAL_DATA'
  },
  culvert: {
    culvert: 'CULVERT',
    culvertBasicData: 'CULVERT_BASIC_DATA',
    culvertStructuralData: 'CULVERT_STRUCTURAL_DATA',
    culvertRoadOverData: 'CULVERT_ROAD_OVER_DATA',
    culvertConditionAssessment: 'CULVERT_CONDITION_ASSESSMENT'
  },
  bridge: {
    bridge: 'BRIDGE',
    bridgeBasicData: 'BRIDGE_BASIC_DATA',
    bridgeAreaData: 'BRIDGE_AREA_DATA',
    bridgeSuperStructure: 'BRIDGE_SUPER_STRUCTURE',
    bridgeSubStructure: 'BRIDGE_SUB_STRUCTURE',
    bridgeFoundation: 'BRIDGE_FOUNDATION',
    bridgeComponentsAncillaries: 'BRIDGE_COMPONENTS_ANCILLARIES',
    bridgeInspection: 'BRIDGE_INSPECTION'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectFeatureIds.accessories.accessories,
    title: 'project.navigation.submenu.feature.accessories.title',
    subItems: [
      {
        id: projectFeatureIds.accessories.accessoriesBasic,
        title: 'project.navigation.submenu.feature.accessories.accessories-basic',
        path: `/projects/${typeId}/details/${id}/feature/accessories/accessories-basic`,
        model: 'accessoriesbasic',
        apiRoute: 'accessories-basic'
      },
      {
        id: projectFeatureIds.accessories.roadSafetyFeatures,
        title: 'project.navigation.submenu.feature.accessories.road-safety-features',
        path: `/projects/${typeId}/details/${id}/feature/accessories/road-safety-features`,
        model: 'roadsafetyfeatures',
        apiRoute: 'road-safety-features'
      },
      {
        id: projectFeatureIds.accessories.roadDrainage,
        title: 'project.navigation.submenu.feature.accessories.road-drainage',
        path: `/projects/${typeId}/details/${id}/feature/accessories/road-drainage`,
        model: 'roaddrainage',
        apiRoute: 'road-drainage'
      },
      {
        id: projectFeatureIds.accessories.drainageGeotechnicalData,
        title: 'project.navigation.submenu.feature.accessories.drainage-geotechnical-data',
        path: `/projects/${typeId}/details/${id}/feature/accessories/drainage-geotechnical-data`,
        model: 'drainagegeotechnicaldata',
        apiRoute: 'drainage-geotechnical-data'
      }
    ]
  },
  {
    id: projectFeatureIds.culvert.culvert,
    title: 'project.navigation.submenu.feature.culvert.title',
    subItems: [
      {
        id: projectFeatureIds.culvert.culvertBasicData,
        title: 'project.navigation.submenu.feature.culvert.culvert-basic-data',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-basic-data`,
        model: 'culvertbasicdata',
        apiRoute: 'culvert-basic-data'
      },
      {
        id: projectFeatureIds.culvert.culvertStructuralData,
        title: 'project.navigation.submenu.feature.culvert.culvert-structural-data',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-structural-data`,
        model: 'culvertstructuraldata',
        apiRoute: 'culvert-structural-data'
      },
      {
        id: projectFeatureIds.culvert.culvertRoadOverData,
        title: 'project.navigation.submenu.feature.culvert.culvert-road-over-data',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-road-over-data`,
        model: 'culvertroadoverdata',
        apiRoute: 'culvert-road-over-data'
      },
      {
        id: projectFeatureIds.culvert.culvertConditionAssessment,
        title: 'project.navigation.submenu.feature.culvert.culvert-condition-assessment',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-condition-assessment`,
        model: 'culvertconditionassessment',
        apiRoute: 'culvert-condition-assessment'
      }
    ]
  },
  {
    id: projectFeatureIds.bridge.bridge,
    title: 'project.navigation.submenu.feature.bridge.title',
    subItems: [
      {
        id: projectFeatureIds.bridge.bridgeBasicData,
        title: 'project.navigation.submenu.feature.bridge.bridge-basic-data',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-basic-data`,
        model: 'bridgebasicdata',
        apiRoute: 'bridge-basic-data'
      },
      {
        id: projectFeatureIds.bridge.bridgeAreaData,
        title: 'project.navigation.submenu.feature.bridge.bridge-area-data',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-area-data`,
        model: 'bridgeareadata',
        apiRoute: 'bridge-area-data'
      },
      {
        id: projectFeatureIds.bridge.bridgeSuperStructure,
        title: 'project.navigation.submenu.feature.bridge.bridge-super-structure',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-super-structure`,
        model: 'bridgesuperstructure',
        apiRoute: 'bridge-super-structure'
      },
      {
        id: projectFeatureIds.bridge.bridgeSubStructure,
        title: 'project.navigation.submenu.feature.bridge.bridge-sub-structure',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-sub-structure`,
        model: 'bridgesubstructure',
        apiRoute: 'bridge-sub-structure'
      },
      {
        id: projectFeatureIds.bridge.bridgeFoundation,
        title: 'project.navigation.submenu.feature.bridge.bridge-foundation',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-foundation`,
        model: 'bridgefoundation',
        apiRoute: 'bridge-foundation'
      },
      {
        id: projectFeatureIds.bridge.bridgeComponentsAncillaries,
        title: 'project.navigation.submenu.feature.bridge.bridge-components-ancillaries',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-components-ancillaries`,
        model: 'bridgecomponentsancillaries',
        apiRoute: 'bridge-components-ancillaries'
      },
      {
        id: projectFeatureIds.bridge.bridgeInspection,
        title: 'project.navigation.submenu.feature.bridge.bridge-inspection',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-inspection`,
        model: 'bridgeinspection',
        apiRoute: 'bridge-inspection'
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