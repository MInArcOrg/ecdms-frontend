import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectSegmentIds = {
  design: {
    design: 'DESIGN',
    designStandard: 'DESIGN_STANDARD',
    safetyAndHealth: 'SAFETY_AND_HEALTH'
  },
  segment: {
    segment: 'SEGMENT',
    roadSegment: 'ROAD_SEGMENT',
    segmentCoordinates: 'SEGMENT_COORDINATES',
    segmentGeometry: 'SEGMENT_GEOMETRY',
    intersectionAndDriveway: 'INTERSECTION_AND_DRIVEWAY',
    trafficParameters: 'TRAFFIC_PARAMETERS',
    trafficVolume: 'TRAFFIC_VOLUME',
    pavement: 'PAVEMENT',
    roadSurfaceCondition: 'ROAD_SURFACE_CONDITION'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectSegmentIds.segment.segment,
    title: 'project.navigation.submenu.segment.segment.title',
    subItems: [
      {
        id: projectSegmentIds.segment.roadSegment,
        title: 'project.navigation.submenu.segment.segment.road-segment',
        path: `/projects/${typeId}/details/${id}/segment/segment/road-segment`,
        model: 'roadsegment',
        apiRoute: 'road-segments'
      },
      {
        id: projectSegmentIds.segment.segmentCoordinates,
        title: 'project.navigation.submenu.segment.segment.segment-coordinates',
        path: `/projects/${typeId}/details/${id}/segment/segment/segment-coordinates`,
        model: 'segmentcoordinate',
        apiRoute: 'segment-coordinates'
      },
      {
        id: projectSegmentIds.segment.segmentGeometry,
        title: 'project.navigation.submenu.segment.segment.segment-geometry',
        path: `/projects/${typeId}/details/${id}/segment/segment/segment-geometry`,
        model: 'segmentgeometry',
        apiRoute: 'segment-geometries'
      },
      {
        id: projectSegmentIds.segment.intersectionAndDriveway,
        title: 'project.navigation.submenu.segment.segment.intersection-and-driveway',
        path: `/projects/${typeId}/details/${id}/segment/segment/intersection-and-driveway`,
        model: 'intersectionanddriveway',
        apiRoute: 'intersection-and-driveways'
      },
      {
        id: projectSegmentIds.segment.trafficParameters,
        title: 'project.navigation.submenu.segment.segment.traffic-parameters',
        path: `/projects/${typeId}/details/${id}/segment/segment/traffic-parameters`,
        model: 'trafficparameter',
        apiRoute: 'traffic-parameters'
      },
      {
        id: projectSegmentIds.segment.trafficVolume,
        title: 'project.navigation.submenu.segment.segment.traffic-volume',
        path: `/projects/${typeId}/details/${id}/segment/segment/traffic-volume`,
        model: 'trafficvolume',
        apiRoute: 'traffic-volumes'
      },
      {
        id: projectSegmentIds.segment.pavement,
        title: 'project.navigation.submenu.segment.segment.pavement',
        path: `/projects/${typeId}/details/${id}/segment/segment/pavement`,
        model: 'pavement',
        apiRoute: 'pavements'
      },
      {
        id: projectSegmentIds.segment.roadSurfaceCondition,
        title: 'project.navigation.submenu.segment.segment.road-surface-condition',
        path: `/projects/${typeId}/details/${id}/segment/segment/road-surface-condition`,
        model: 'roadsurfacecondition',
        apiRoute: 'road-surface-conditions'
      }
    ]
  }, {
    id: projectSegmentIds.design.design,
    title: 'project.navigation.submenu.segment.design.title',
    subItems: [
      {
        id: projectSegmentIds.design.designStandard,
        title: 'project.navigation.submenu.segment.design.design-standard',
        path: `/projects/${typeId}/details/${id}/segment/design/design-standard`,
        model: 'designstandard',
        apiRoute: 'design-standards'
      },
      {
        id: projectSegmentIds.design.safetyAndHealth,
        title: 'project.navigation.submenu.segment.design.safety-and-health',
        path: `/projects/${typeId}/details/${id}/segment/design/safety-and-health`,
        model: 'safetyandhealth',
        apiRoute: 'safety-and-healths'
      }
    ]
  },
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
