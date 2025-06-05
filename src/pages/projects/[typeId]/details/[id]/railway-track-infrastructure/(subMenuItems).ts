import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

export const railwayTrackInfrastructureIds = {
  trackSystems: {
    trackSystems: 'TRACK_SYSTEMS',
    tracksData: 'TRACKS_DATA',
    tracksGeometryData: 'TRACKS_GEOMETRY_DATA',
    tracksConditionAssessment: 'TRACKS_CONDITION_ASSESSMENT',
    tracksMaintenanceInspections: 'TRACKS_MAINTENANCE_INSPECTIONS',
    tracksRehabilitationRenewal: 'TRACKS_REHABILITATION_RENEWAL',
    trackSafety: 'TRACK_SAFETY'
  },
  ballastSystems: {
    ballastSystems: 'BALLAST_SYSTEMS',
    ballast: 'BALLAST',
    ballastMaterialData: 'BALLAST_MATERIAL_DATA',
    ballastMaterialSpecification: 'BALLAST_MATERIAL_SPECIFICATION',
    ballastConditionAssessment: 'BALLAST_CONDITION_ASSESSMENT',
    ballastMaintenanceRenewal: 'BALLAST_MAINTENANCE_RENEWAL',
    ballastDrainageWaterManagement: 'BALLAST_DRAINAGE_WATER_MANAGEMENT',
    ballastEnvironmentalFactors: 'BALLAST_ENVIRONMENTAL_FACTORS'
  },
  subBallastSystems: {
    subBallastSystems: 'SUB_BALLAST_SYSTEMS',
    subBallastMaterials: 'SUB_BALLAST_MATERIALS',
    subBallastMaterialTest: 'SUB_BALLAST_MATERIAL_TEST',
    subBallastConditionAssessment: 'SUB_BALLAST_CONDITION_ASSESSMENT',
    subBallastMaintenanceRenewal: 'SUB_BALLAST_MAINTENANCE_RENEWAL',
    subBallastDrainageWaterManagement: 'SUB_BALLAST_DRAINAGE_WATER_MANAGEMENT',
    subBallastEnvironmentalFactors: 'SUB_BALLAST_ENVIRONMENTAL_FACTORS'
  },
  sleeperAndFasteningSystems: {
    sleeperAndFasteningSystems: 'SLEEPER_AND_FASTENING_SYSTEMS',
    sleeperCharacteristics: 'SLEEPER_CHARACTERISTICS',
    sleeperConditionAssessment: 'SLEEPER_CONDITION_ASSESSMENT',
    sleeperMaintenanceReplacement: 'SLEEPER_MAINTENANCE_REPLACEMENT',
    sleeperFasteningSystems: 'SLEEPER_FASTENING_SYSTEMS',
    sleeperEnvironmentalFactors: 'SLEEPER_ENVIRONMENTAL_FACTORS',
    fasteningSystemCharacteristics: 'FASTENING_SYSTEM_CHARACTERISTICS',
    fasteningSystemConditionAssessment: 'FASTENING_SYSTEM_CONDITION_ASSESSMENT',
    fasteningSystemMaintenanceReplacement: 'FASTENING_SYSTEM_MAINTENANCE_REPLACEMENT',
    fasteningSystemEnvironmentalFactors: 'FASTENING_SYSTEM_ENVIRONMENTAL_FACTORS'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: railwayTrackInfrastructureIds.trackSystems.trackSystems,
    title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.title',
    subItems: [
      {
        id: railwayTrackInfrastructureIds.trackSystems.tracksData,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.tracks-data',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-data`,
        model: 'railwaytracksdata',
        apiRoute: 'railway-track-data'
      },
      {
        id: railwayTrackInfrastructureIds.trackSystems.tracksGeometryData,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.tracks-geometry-data',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-geometry-data`,
        model: 'railwaytracksgeometrydata',
        apiRoute: 'railway-track-geometry-data'
      },
      {
        id: railwayTrackInfrastructureIds.trackSystems.tracksConditionAssessment,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.tracks-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-condition-assessment`,
        apiRoute: 'railway-track-condition-assessments',
        model: 'railwaytracksconditionassessment'
      },
      {
        id: railwayTrackInfrastructureIds.trackSystems.tracksMaintenanceInspections,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.tracks-maintenance-inspections',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-maintenance-inspections`,
        apiRoute: 'railway-track-maintenance-and-inspections',
        model: 'railwaytracksmaintenanceandinspection'
      },
      {
        id: railwayTrackInfrastructureIds.trackSystems.tracksRehabilitationRenewal,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.tracks-rehabilitation-renewal',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-rehabilitation-renewal`,
        apiRoute: 'railway-track-rehabilitation-or-renewals',
        model: 'railwaytracksrehabilitationorrenewal'
      },
      {
        id: railwayTrackInfrastructureIds.trackSystems.trackSafety,
        title: 'project.navigation.submenu.railway-track-infrastructure.track-systems.track-safety',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/track-safety`,
        apiRoute: 'railway-track-safeties',
        model: 'railwaytracksafety'
      }
    ]
  },
  {
    id: railwayTrackInfrastructureIds.ballastSystems.ballastSystems,
    title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.title',
    subItems: [
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballast,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast`,
        apiRoute: 'railway-ballasts',
        model: 'railwayballast'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastMaterialData,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-material-data',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-material-data`,
        apiRoute: 'railway-ballast-material-data',
        model: 'railwayballastmaterialdata'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-material-specification',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-material-specification`,
        apiRoute: 'railway-ballast-material-specifications',
        model: 'railwayballastmaterialspecification'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastConditionAssessment,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-condition-assessment`,
        apiRoute: 'railway-ballast-condition-assessments',
        model: 'railwayballastconditionassessment'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-maintenance-renewal',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-maintenance-renewal`,
        apiRoute: 'railway-ballast-maintenance-and-renewals',
        model: 'railwayballastmaintenanceandrenewal'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastDrainageWaterManagement,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-drainage-water-management',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-drainage-water-management`,
        apiRoute: 'railway-ballast-drainage-and-water-managements',
        model: 'railwayballastdrainageandwatermanagement'
      },
      {
        id: railwayTrackInfrastructureIds.ballastSystems.ballastEnvironmentalFactors,
        title: 'project.navigation.submenu.railway-track-infrastructure.ballast-systems.ballast-environmental-factors',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/ballast-systems/ballast-environmental-factors`,
        apiRoute: 'railway-ballast-environmental-and-other-factors',
        model: 'railwayballastenvironmentalandotherfactor'
      }
    ]
  },
  {
    id: railwayTrackInfrastructureIds.subBallastSystems.subBallastSystems,
    title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.title',
    subItems: [
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-materials',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-materials`,
        apiRoute: 'railway-sub-ballast-materials',
        model: 'railwaysubballastmaterial'
      },
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterialTest,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-material-test',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-material-test`,
        apiRoute: 'railway-sub-ballast-material-tests',
        model: 'railwaysubballastmaterialtest'
      },
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastConditionAssessment,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-condition-assessment`,
        apiRoute: 'railway-sub-ballast-condition-assessments',
        model: 'railwaysubballastconditionassessment'
      },
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastMaintenanceRenewal,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-maintenance-renewal',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-maintenance-renewal`,
        apiRoute: 'railway-sub-ballast-maintenance-and-renewals',
        model: 'railwaysubballastmaintenanceandrenewal'
      },
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastDrainageWaterManagement,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-drainage-water-management',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-drainage-water-management`,
        apiRoute: 'railway-sub-ballast-drainage-and-water-managements',
        model: 'railwaysubballastdrainageandwatermanagement'
      },
      {
        id: railwayTrackInfrastructureIds.subBallastSystems.subBallastEnvironmentalFactors,
        title: 'project.navigation.submenu.railway-track-infrastructure.sub-ballast-systems.sub-ballast-environmental-factors',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sub-ballast-systems/sub-ballast-environmental-factors`,
        apiRoute: 'railway-sub-ballast-environmental-and-other-factors',
        model: 'railwaysubballastenvironmentalandotherfactor'
      }
    ]
  },
  {
    id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperAndFasteningSystems,
    title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.title',
    subItems: [
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperCharacteristics,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.sleeper-characteristics',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/sleeper-characteristics`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperConditionAssessment,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.sleeper-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/sleeper-condition-assessment`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperMaintenanceReplacement,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.sleeper-maintenance-replacement',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/sleeper-maintenance-replacement`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperFasteningSystems,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.sleeper-fastening-systems',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/sleeper-fastening-systems`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperEnvironmentalFactors,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.sleeper-environmental-factors',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/sleeper-environmental-factors`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemCharacteristics,
        title: 'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.fastening-system-characteristics',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/fastening-system-characteristics`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemConditionAssessment,
        title:
          'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.fastening-system-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/fastening-system-condition-assessment`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemMaintenanceReplacement,
        title:
          'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.fastening-system-maintenance-replacement',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/fastening-system-maintenance-replacement`
      },
      {
        id: railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemEnvironmentalFactors,
        title:
          'project.navigation.submenu.railway-track-infrastructure.sleeper-and-fastening-systems.fastening-system-environmental-factors',
        path: `/projects/${typeId}/details/${id}/railway-track-infrastructure/sleeper-and-fastening-systems/fastening-system-environmental-factors`
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
