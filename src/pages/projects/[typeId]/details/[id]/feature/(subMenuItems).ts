import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectFeatureIds = {
  accessories: {
    accessories: 'ACCESSORIES',
    roadSafetyFeatures: 'ROAD_SAFETY_FEATURES',
    roadDrainage: 'ROAD_DRAINAGE',
    drainageGeotechnicalData: 'DRAINAGE_GEOTECHNICAL_DATA'
  },
  culvert: {
    culvert: 'CULVERT',
    culvertBasicData: 'CULVERT_BASIC_DATA',
    culvertStructuralData: 'CULVERT_STRUCTURAL_DATA',
    culvertRoadOverInformation: 'CULVERT_ROAD_OVER_DATA',
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
        id: projectFeatureIds.accessories.accessories,
        title: 'project.navigation.submenu.feature.accessories.accessories',
        path: `/projects/${typeId}/details/${id}/feature/accessories/accessories`,
        model: 'accessory',
        apiRoute: 'accessories'
      },
      {
        id: projectFeatureIds.accessories.roadSafetyFeatures,
        title: 'project.navigation.submenu.feature.accessories.road-safety-features',
        path: `/projects/${typeId}/details/${id}/feature/accessories/road-safety-features`,
        model: 'roadsafetyfeature',
        apiRoute: 'road-safety-features'
      },
      {
        id: projectFeatureIds.accessories.roadDrainage,
        title: 'project.navigation.submenu.feature.accessories.road-drainage',
        path: `/projects/${typeId}/details/${id}/feature/accessories/road-drainage`,
        model: 'roaddrainage',
        apiRoute: 'road-drainages'
      },
      {
        id: projectFeatureIds.accessories.drainageGeotechnicalData,
        title: 'project.navigation.submenu.feature.accessories.drainage-geotechnical-data',
        path: `/projects/${typeId}/details/${id}/feature/accessories/drainage-geotechnical-data`,
        model: 'geotechnicalinformation',
        apiRoute: 'geotechnical-informations'
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
        apiRoute: 'culvert-basic-datas'
      },
      {
        id: projectFeatureIds.culvert.culvertStructuralData,
        title: 'project.navigation.submenu.feature.culvert.culvert-structural-information',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-structural-information`,
        model: 'culvertstructuralinformation',
        apiRoute: 'culvert-structural-informations'
      },
      {
        id: projectFeatureIds.culvert.culvertRoadOverInformation,
        title: 'project.navigation.submenu.feature.culvert.culvert-road-over-information',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-road-over-information`,
        model: 'culvertroadoverinformation',
        apiRoute: 'culvert-road-over-informations'
      },
      {
        id: projectFeatureIds.culvert.culvertConditionAssessment,
        title: 'project.navigation.submenu.feature.culvert.culvert-condition-assessment',
        path: `/projects/${typeId}/details/${id}/feature/culvert/culvert-condition-assessment`,
        model: 'culvertconditionassessment',
        apiRoute: 'culvert-condition-assessments'
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
        apiRoute: 'bridge-basic-datas'
      },
      {
        id: projectFeatureIds.bridge.bridgeAreaData,
        title: 'project.navigation.submenu.feature.bridge.bridge-area-data',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-area-data`,
        model: 'bridgeareadata',
        apiRoute: 'bridge-area-datas'
      },
      {
        id: projectFeatureIds.bridge.bridgeSuperStructure,
        title: 'project.navigation.submenu.feature.bridge.bridge-super-structure',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-super-structure`,
        model: 'bridgesuperstructure',
        apiRoute: 'bridge-super-structures'
      },
      {
        id: projectFeatureIds.bridge.bridgeSubStructure,
        title: 'project.navigation.submenu.feature.bridge.bridge-sub-structure',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-sub-structure`,
        model: 'bridgesubstructure',
        apiRoute: 'bridge-sub-structures'
      },
      {
        id: projectFeatureIds.bridge.bridgeFoundation,
        title: 'project.navigation.submenu.feature.bridge.bridge-foundation',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-foundation`,
        model: 'bridgefoundation',
        apiRoute: 'bridge-foundations'
      },
      {
        id: projectFeatureIds.bridge.bridgeComponentsAncillaries,
        title: 'project.navigation.submenu.feature.bridge.bridge-components-ancillaries',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-components-ancillaries`,
        model: 'bridgecomponentandancillaries',
        apiRoute: 'bridge-component-and-ancillaries'
      },
      {
        id: projectFeatureIds.bridge.bridgeInspection,
        title: 'project.navigation.submenu.feature.bridge.bridge-inspection',
        path: `/projects/${typeId}/details/${id}/feature/bridge/bridge-inspection`,
        model: 'bridgeinspection',
        apiRoute: 'bridge-inspections'
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
