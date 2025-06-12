import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';
import { ProjectGeneralMaster } from '../general/general-master';

export interface Port {
  id: string;
  parent_id?: string;
  project_id: string;
  owner?: string;
  operator?: string;
  port_type?: string;
  site_area?: number;
  annual_traffic_size?: number;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface TelecomInfrastructure {
  id: string;
  parent_id?: string;
  project_id: string;
  name: string;
  specifications?: string;
  coverage_area?: number;
  no_of_families_coverage?: number;
  service_period?: string | Date | EthiopianDate;
  service_periods: string;
  inauguration_date?: string | Date | EthiopianDate;
  revision_no?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
export interface MobileNetwork {
  id: string;
  project_id: string;
  mobile_network_type_id: string;
  mobilenetworktype: ProjectGeneralMaster;
  call_towers?: boolean;
  antennas?: boolean;
  base_stations?: boolean;
  repeaters?: boolean;
  switches?: boolean;
  others?: string;
  created_at: string | Date;
  updated_at?: string | Date;
}
export interface BuildingDimensionDetail {
  id: string;
  parent_id?: string;
  project_id: string;
  site_area?: number;
  site_above_sea_level?: number;
  ground_floor_area?: number;
  total_floor_area?: number;
  basement_stories_no?: number;
  above_ground_floor_stories_no?: number;
  height_above_natural_ground?: number;
  depth_below_natural_ground?: number;
  file_id?: string;
  remark?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface BuildingEnvelopMaterial {
  id: string;
  parent_id?: string;
  project_id: string;
  exterior_walls?: string;
  roof_assembly?: string;
  exterior_windows?: string;
  exterior_doors?: string;
  shading_components?: string;
  file_id?: string;
  remark?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface RoadInfo {
  id: string;
  parent_id?: string | null;
  project_id: string;
  material?: string | null;
  location_function?: string | null;
  traffic_volume?: number | null;
  traffic_type?: string | null;
  economy?: string | null;
  rigidity?: string | null;
  topography?: string | null;
  revision_no?: number | null;
  created_at: Date;
  updated_at: Date;
}
export interface RoadSegment {
  id: string;
  parent_id?: string;
  project_id: string;
  name: string;
  surface_type_id: string;
  start_northing?: number;
  start_easting?: number;
  end_northing?: number;
  end_easting?: number;
  design_standard_id?: string;
  created_at: Date;
  updated_at: Date;
}
export interface RoadLayer {
  id: string;
  parent_id?: string;
  project_id: string;
  segment_id: string;
  roadsegment: RoadSegment;
  name?: string;
  number?: number;
  thickness?: number;
  material?: string;
  specifications?: string;
  description?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface GeneratingCapacity {
  id: string;
  parent_id?: string;
  operator?: string;
  project_id: string;
  commission_date?: string | Date | EthiopianDate;
  turbine_type_number?: number;
  designed_capacity?: string;
  generating_capacity?: string;
  installed_capacity?: string;
  capacity_factor?: string;
  annual_generation?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface TurbineInfo {
  id: string;
  parent_id?: string;
  project_id: string;
  turbine_type?: string;
  name: string;
  detail?: string;
  generating_capacity?: string;
  designed_quantity?: string;
  installed_quantity?: string;
  functional_quantity?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface HydroElectricDam {
  id: string;
  parent_id?: string;
  project_id: string;
  river_name: string;
  elevation_from_sea_level?: string;
  elevation_from_ngl?: string;
  dam_type?: string;
  dam_volume?: string;
  gated_spillway_no?: number;
  none_gated_spillway_no?: number;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface SolarEnergy {
  id: string;
  parent_id?: string;
  project_id: string;
  model_id: string;
  title: string;
  description?: string;
  specifications?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface WindEnergy {
  id: string;
  parent_id?: string;
  project_id: string;
  model_id?: string;
  title: string;
  description?: string;
  specifications?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface TransformerType {
  id: string;
  parent_id?: string;
  project_id?: string;
  name: string;
  description?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface Transformer {
  id: string;
  parent_id?: string;
  project_id: string;
  transformertype_id: string;
  specifications?: string;
  input_current?: string;
  input_voltage?: string;
  output_current?: string;
  output_voltage?: string;
  transformertype: TransformerType;
  northing?: number;
  easting?: number;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface TransmissionLine {
  id: string;
  parent_id?: string | null;
  project_id: string;
  name: string;
  line_type?: string | null;
  transmission_capacity?: string | null;
  transmitting_power?: string | null;
  transmitting_current?: string | null;
  transmitting_voltage?: string | null;
  transmission_towers_number?: number | null;
  start_northing?: number | null;
  start_easting?: number | null;
  end_northing?: number | null;
  end_easting?: number | null;
  revision_no?: number | null;
  created_at?: Date;
  updated_at?: Date;
}
export interface ElectricTower {
  id: string;
  parent_id?: string | null;
  project_id: string;
  transmissionline_id: string;
  overall_length?: number | null;
  embedded_length?: number | null;
  columns?: string | null;
  braces?: string | null;
  beam_cross_arms?: string | null;
  brace_cross_arm?: string | null;
  elasticity_modulus?: string | null;
  poission_ratio?: string | null;
  revision_no?: number | null;
  created_at?: Date;
  updated_at?: Date;
}
export interface Railway {
  id: string;
  parent_id?: string | null;
  project_id: string;
  energy_source?: string | null;
  major_operator?: string | null;
  system_length?: number | null;
  total_station_no?: number | null;
  fright_cargo_no?: number | null;
  transport_cargo_no?: number | null;
  revision_no?: number | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface RailwayStation {
  id: string;
  parent_id?: string;
  project_id: string;
  name: string;
  specifications?: string;
  northing?: number;
  easting?: number;
  revision_no?: number;
  created_at: Date;
  updated_at: Date;
}
export interface ReservoirInfo {
  id: string;
  parent_id?: string;
  project_id: string;
  dam_volume?: string;
  total_capacity?: string;
  active_capacity?: string;
  inactive_capacity?: string;
  catchment_area?: number;
  surface_area?: number;
  revision_no?: number;
  created_at: Date;
  updated_at: Date;
}
export interface SpillwayInfo {
  id: string;
  parent_id?: string;
  project_id: string;
  name?: string;
  type?: string;
  quantity?: number;
  specifications?: string;
  capacity?: number;
  revision_no?: number;
  created_at: Date;
  updated_at: Date;
}
export interface IrrigationCapacity {
  id: string;
  parent_id?: string;
  project_id: string;
  designed_irrigation_capacity?: number;
  actual_irrigation_capacity?: number;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface WaterIrrigationDam {
  id: string;
  parent_id?: string;
  project_id: string;
  dam_volume?: number;
  total_capacity?: number;
  active_capacity?: number;
  inactive_capacity?: number;
  catchment_area?: number;
  surface_area?: number;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface HydrologicalInformation {
  id: string;
  project_id: string;
  water_source?: string; // Optional String
  catchment_area?: number; // Optional Double
  elevation_change?: number; // Optional Double
  head?: number; // Optional Double
  total_inflow?: number; // Optional Double
  active_storage_volume?: number; // Optional Double
  water_stored?: number; // Optional Double
  remark?: string; // Optional Text
  created_at?: Date;
  updated_at?: Date;
}
export interface GeothermalPowerInfrastructure {
  id: string;
  project_id: string; // Required UUID
  turbine_manufacturer?: string; // Optional String
  turbine_model?: string; // Optional String
  turbine_type_id?: string; // Optional UUID
  each_turbine_capacity?: number; // Optional Double
  remark?: string; // Optional Text
  created_at?: Date;
  updated_at?: Date;
}
export interface DrainageAssessment {
  id: string;
  project_id: string;
  road_segment: string;
  drainage_type_id: string;
  drainage_condition_id: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SafetyAndHealth {
  id: string;
  project_id: string;
  road_segment: string;
  hazard_type_id: string;
  potential_impact_id: string;
  risk_level_id: string;
  immediate_action_taken?: string;
  incident_type_id: string;
  incident_time?: string | Date | EthiopianDate;
  medicare_required?: boolean;
  total_injury_number?: number;
  incident_reported_by?: string;
  personal_protective_equipment_type_id: string;
  personal_protective_equipment_condition_id: string;
  trained_on_equipment_usage?: boolean;
  training_hours_number?: number;
  weather_condition_during_incident_id: string;
  injury_severity_id: string;
  fatality_number?: number;
  recommendation?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export interface MaintenanceHistory {
  id: string;
  project_id: string;
  road_segment: string;
  last_maintenance_date?: Date;
  maintenance_type_id: string;
  maintenance_cost?: number;
  severity_level_id: string;
  suggested_repair_id: string;
  recommended_action_urgency_id: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RoadSurfaceCondition {
  id: string;
  project_id: string;
  road_segment: string;
  cracks?: boolean;
  rutting?: boolean;
  patching?: boolean;
  drainage_problems?: boolean;
  action_taken_date?: string | Date | EthiopianDate;
  action_taken?: string;
  action_taken_cost?: number;
  assessment_condition_id: string;
  surface_type_id: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MobileNetworkComponentAge {
  id: string;
  mobile_network_id: string;
  cell?: number;
  towers?: number;
  antennas?: number;
  base_stations?: number;
  repeaters?: number;
  switches?: number;
  others?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NetworkCoverage {
  id: string;
  project_id: string;
  network_infrastructure_type_id: string;
  networkinfrastructuretype: MobileNetwork;
  total_coverage_area?: number;
  coverage_population_number?: number;
  active_users_number?: number;
  average_download_speed?: number;
  average_upload_speed?: number;
  signal_strength?: number;
  others?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SegmentGeometry {
  id: string;
  project_id: string;
  name: string;
  carriage_way_width?: number;
  lane_width?: number;
  shoulder_width?: number;
  cross_section_type_id: string;
  grade_percentage?: number;
  elevation_change?: number;
  cross_slope_percentage?: number;
  property_access_control?: boolean;
  similar_for_all_lane?: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface IntersectionAndDriveway {
  id: string;
  project_id: string;
  name: string;
  number_of_intersections?: number;
  intersection_type_id: string;
  driveway_access_point_id: string;
  similar_for_all?: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface TrafficParameter {
  id: string;
  project_id: string;
  name: string;
  pedestrian_facility_id: string;
  parking?: number;
  design_traffic_flow?: number;
  design_speed?: number;
  similar_for_all?: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface Accessory {
  id: string;
  project_id: string;
  name: string;
  under_passes?: number;
  ramps?: number;
  traffic_signals?: number;
  repair_stations?: number;
  bicycle_lanes?: boolean;
  bicycle_signals?: number;
  culvert?: boolean;
  bridge?: boolean;
  created_at: Date;
  updated_at: Date;
}
export interface Pavement {
  id: string;
  project_id: string;
  name: string;
  tangent_length?: number;
  curve_length?: number;
  road_length_type_id: string;
  road_pavement_thickness?: number;
  paved_road_surface_width?: number;
  created_at: Date;
  updated_at: Date;
}
export interface CulvertBasicData {
  id: string;
  project_id: string;
  name: string;
  culvert_name: string;
  culvert_number?: number;
  culvert_coordinate_x?: number;
  culvert_coordinate_y?: number;
  area_topography_id: string;
  highest_water_level?: number;
  lowest_water_level?: number;
  construction_year?: number;
  contractor?: string;
  designer?: string;
  culvert_cost?: number;
  detour_possibility?: boolean;
  road_alignment?: string;
  altitude?: number;
  created_at: Date;
  updated_at: Date;
}
export interface CulvertStructuralInformation {
  id: string;
  project_id: string;
  name: string;
  culvert_type?: string;
  culvert_barrel_length?: number;
  culvert_height?: number;
  opening_number?: number;
  opening_width?: number;
  total_culvert_width?: number;
  distance_between_barrels?: number;
  head_wall_length?: number;
  pier_type_id: string;
  pier_height?: number;
  abutment_type_id: string;
  abutment_average_height?: number;
  endwall_type_inlet_id: string;
  endwall_type_outlet_id: string;
  wingwall_average_length?: number;
  paved_water_way_type_id: string;
  soil_type_id: string;
  created_at: Date;
  updated_at: Date;
}
export interface CulvertRoadOverInformation {
  id: string;
  project_id: string;
  name: string;
  carriage_way_width?: number;
  side_walk_width?: number;
  lane_number?: number;
  head_wall_to_head_wall?: number;
  average_fill_height?: number;
  guard_rail_type_id: string;
  parapet_length?: number;
  created_at: Date;
  updated_at: Date;
}

export interface BridgeFoundation {
  id: string;
  project_id: string;
  name: string;
  bridge_name: string;
  abutment_type_id: string;
  pier_type_id: string;
  abutment_foundation_size?: number;
  pier_foundation_size?: number;
  abutment_pile_number?: number;
  pier_pile_number?: number;
  abutment_pile_depth?: number;
  pier_pile_depth?: number;
  soil_type_id: string;
  created_at: Date;
  updated_at: Date;
}

// Bridge SubStructure model
export interface BridgeSubStructure {
  id: string;
  project_id: string; // Required UUID - Reference to the related project
  name: string; // Required String - Name of the bridge substructure
  bridge_name: string; // Required String - Official name of the bridge
  abutment_a1_height?: number | null; // Optional Double - Height of abutment A1
  abutment_a1_width?: number | null; // Optional Double - Width of abutment A1
  abutment_a2_height?: number | null; // Optional Double - Height of abutment A2
  abutment_a2_width?: number | null; // Optional Double - Width of abutment A2
  wing_wall_length?: number | null; // Optional Double - Length of the wing wall
  pier_type_id: string; // Required UUID - Reference to the pier type
  piers_number?: number | null; // Optional Integer - Number of piers
  piers_dimension?: string | null; // Optional String - Dimension of piers
  pier1_height?: number | null; // Optional Double - Height of pier 1
  pier1_width?: number | null; // Optional Double - Width of pier 1
  pier2_height?: number | null; // Optional Double - Height of pier 2
  pier2_width?: number | null; // Optional Double - Width of pier 2
  created_at?: Date;
  updated_at?: Date;
}
// Bridge Structure Information model
export interface BridgeSuperStructure {
  id: string;
  project_id: string;
  name: string;
  bridge_name: string;
  bridge_structure_type_id: string;
  span_number?: number | null;
  span_composition?: string | null;
  total_span_length?: number | null;
  carriage_width?: number | null;
  side_walk_width?: number | null;
  lane_number?: number | null;
  span_support_type_id?: string | null;
  deck_slab_type_id?: string | null;
  girder_number?: number | null;
  girder_depth?: number | null;
  girder_spacing?: number | null;
  girder_width?: number | null;
  created_at: Date;
  updated_at: Date;
}
// Bridge Basic Data model
export interface BridgeBasicData {
  id: string;
  project_id: string; // Required UUID - Reference to the related project
  name: string; // Required String - Name of the bridge record
  bridge_name: string;
  bridge_number: string | null; // Optional String - Identification number for the bridge
  bridge_length: number | null; // Optional Double - Length of the bridge (in meters)
  bridge_width: number | null; // Optional Double - Width of the bridge (in meters)
  construction_year: number | null; // Optional Integer - Year the bridge was constructed
  contractor: string | null; // Optional String - Name of the contractor
  designer: string | null; // Optional String - Name of the designer
  bridge_cost: number | null; // Optional Double - Total cost of the bridge
  land_capacity: number | null; // Optional Double - Load capacity supported by the bridge
  average_daily_traffic: number | null; // Optional Integer - Estimated daily traffic over the bridge
  created_at?: string;
  updated_at?: string;
}
// Bridge Area Data model
export interface BridgeAreaData {
  id: string;
  project_id: string; // Required UUID
  name: string; // Required String
  bridge_name: string; // Required String
  river_width: number | null; // Optional Double
  highest_water_level: number | null; // Optional Double
  lowest_water_level: number | null; // Optional Double
  area_topography_id: string; // Required UUID
  detour_possibility: boolean | null; // Optional Boolean
  road_alignment: string | null; // Optional String
  altitude: number | null; // Optional Double
  load_limit_sign: boolean | null; // Optional Boolean
  created_at?: string;
  updated_at?: string;
}
export interface BridgeSuperStructure {
  id: string;
  project_id: string;
  name: string;
  bridge_name: string;
  bridge_structure_type_id: string;
  span_number?: number | null;
  span_composition?: string | null;
  total_span_length?: number | null;
  carriage_width?: number | null;
  side_walk_width?: number | null;
  lane_number?: number | null;
  span_support_type_id?: string | null;
  deck_slab_type_id?: string | null;
  girder_number?: number | null;
  girder_depth?: number | null;
  girder_spacing?: number | null;
  girder_width?: number | null;
  created_at: Date;
  updated_at: Date;
}

// Bridge Inspection model
export interface BridgeInspection {
  id: string;
  project_id: string;
  name: string;
  bridge_part_defect_id: string;
  damage_type_id: string;
  damage_condition_id: string;
  hydrology_defect_id: string;
  maintenance_action?: string;
  bridge_history?: string;
  inspector_remark?: string;
  created_at: Date;
  updated_at: Date;
}
export interface TrafficVolume {
  id: string;
  project_id: string;
  name: string;
  count_type_id: string;
  count_location_coordinate_x?: number;
  count_location_coordinate_y?: number;
  count_time?: Date;
  lane_number?: number;
  vehicle_number_per_hour?: number;
  average_daily_traffic_volume?: number;
  corridor_importance_level?: number;
  created_at: Date;
  updated_at: Date;
}
export interface RoadProjectQualityControl {
  id: string;
  project_id: string;
  name: string;
  project_phase_id: string;
  inspection_type_id: string;
  defect_encountered?: string;
  remark?: string;
  created_at: Date;
  updated_at: Date;
}
export interface RoadDrainage {
  id: string;
  project_id: string;
  name: string;
  length?: number;
  height?: number;
  width?: number;
  current_condition_id: string;
  weight_limit?: number;
  design_life_span?: number;
  inspection_frequency?: number;
  construction_completion_year?: number;
  remark?: string;
  created_at: Date;
  updated_at: Date;
}
export interface EnvironmentalData {
  id: string;
  project_id: string;
  remark: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoadMaintenanceData {
  id: string;
  project_id: string;
  road_segment: string;
  maintenance_start_date?: Date;
  maintenance_end_date?: Date;
  weather_condition?: string;
  pavement_condition?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface BridgeStructureInformation {
  id: string;
  project_id: string;
  name: string;
  bridge_name: string;
  bridge_structure_type_id: string;
  east_region?: number | null;
  west_region?: number | null;
  central_region?: number | null;
  north_region?: number | null;
  south_region?: number | null;
  ring_road?: number | null;
  remark?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface GeotechnicalInformation {
  id: string;
  project_id: string;
  name: string;
  soil_type_id: string;
  ground_water_impact_id: string;
  soil_bearing_capacity?: number;
  slope_stability_id: string;
  retaining_walls?: boolean;
  geological_hazard?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface EnvironmentalControl {
  id: string;
  data_center_id: string;
  temperature?: string;
  humidity?: string;
  air_quality?: string;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoadMaintenanceActivity {
  id: string;
  project_id: string;
  road_segment: string;
  maintenance_frequency_id?: string;
  maintenance_type_id?: string;
  consultant?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DataCenter {
  id: string;
  project_id: string;
  data_center_type_id: string;
  dataCenterType: ProjectGeneralMaster;
  servers?: boolean;
  storage_devices?: boolean;
  networking_equipment?: boolean;
  cooling_systems?: boolean;
  backup_generators?: boolean;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface TelecomInfrastructureComponent {
  id: string;
  project_id: string;
  mobile_network_type_id: string;
  cables?: number;
  wires?: number;
  routers?: number;
  switches?: number;
  hubs?: number;
  repeaters?: number;
  antennas?: number;
  towers?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface TelecomInfrastructureAge {
  id: string;
  project_id: string;
  cables?: boolean;
  wires?: boolean;
  routers?: boolean;
  switches?: boolean;
  hubs?: boolean;
  repeaters?: boolean;
  antennas?: boolean;
  towers?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Maintenance {
  id: string;
  project_id: string;
  maintenance_frequency?: boolean;
  service_level_agreement?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface NetworkCapacity {
  id: string;
  project_id: string;
  network_type_id: string;
  total_bandwidth?: number;
  users_number?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DataCenterFacilityCapacity {
  id: string;
  data_center_id: string; // Required UUID
  total_floor_area?: string; // Optional String
  power_capacity?: string; // Optional String
  rack_space_capacity?: string; // Optional String
  cooling_capacity?: string; // Optional String
  access_control?: boolean; // Optional Boolean
  surveillance_cameras?: boolean; // Optional Boolean
  fire_suppression_systems?: boolean; // Optional Boolean
  intrusion_detection_systems?: boolean; // Optional Boolean
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface DataCenterComponentAge {
  id: string;

  data_center_id: string; // Required UUID
  servers?: number; // Optional Integer
  storage_devices?: number; // Optional Integer
  networking_equipment?: number; // Optional Integer
  cooling_systems?: number; // Optional Integer
  backup_generators?: number; // Optional Integer
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SatelliteNetwork {
  id: string;
  project_id: string;
  satellite_network_type_id: string;
  name: string;
  satellite?: boolean;
  ground_stations?: boolean;
  modems?: boolean;
  routers?: boolean;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface DataCenterComponentManufacturer {
  id: string;
  data_center_id: string; // Required UUID
  servers?: string; // Optional String
  storage_devices?: string; // Optional String
  networking_equipment?: string; // Optional String
  cooling_systems?: string; // Optional String
  backup_generators?: string; // Optional String
  others?: string; // Optional Text
  created_at?: Date;
  updated_at?: Date;
}

export interface SatelliteInfrastructureAge {
  id: string;
  project_id: string;
  satellite_network_id: string;
  satellite?: number;
  ground_stations?: number;
  modems?: number;
  routers?: number;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SatelliteNetworkComponentManufacturer {
  id: string;
  project_id: string;
  satellite_network_id: string;
  satellite?: string;
  ground_stations?: string;
  modems?: string;
  routers?: string;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface InternetConnection {
  id: string;
  project_id: string;
  internet_connection_type_id: string;
  internetConnectionType: ProjectGeneralMaster;
  routers?: boolean;
  switches?: boolean;
  modems?: boolean;
  cables?: boolean;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface BroadcastingInfrastructure {
  id: string;
  project_id: string;
  broadcasting_infrastructure_type_id: string;
  broadcasting_network?: boolean;
  antennas?: boolean;
  transmitters?: boolean;
  towers?: boolean;
  cables?: boolean;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface InternetConnectionInfrastructureAge {
  id: string;
  internet_connection_id: string; // Required UUID
  internetConnection: InternetConnection;
  routers?: number; // Optional Integer
  switches?: number; // Optional Integer
  modems?: number; // Optional Integer
  cables?: number; // Optional Integer
  others?: string; // Optional Text
  created_at?: Date;
  updated_at?: Date;
}
// Internet Connection model
export interface InternetConnectionInfrastructureManufacturer {
  id: string;
  internet_connection_id: string; // Required UUID
  routers?: string; // Optional String
  switches?: string; // Optional String
  modems?: string; // Optional String
  cables?: string; // Optional String
  others?: string; // Optional Text
  created_at?: Date;
  updated_at?: Date;
}

export interface GeothermalPowerWell {
  id: string;
  project_id: string;
  depth?: number;
  well_diameter?: number;
  drilling_period?: Date;
  temperature_at_bottom_hole?: number;
  wells_number?: number;
  wells_name?: string;
  plant_life?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SolarPanel {
  id: string;
  project_id: string;
  manufacturer?: string;
  model?: string;
  solar_panel_type_id: string;
  solar_panels_number?: number;
  each_solar_panel_capacity?: number;
  inverter_manufacturer?: string;
  inverter_model?: string;
  inverters_number?: number;
  other_equipment?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SolarResourceInformation {
  id: string;
  project_id: string;
  annual_solar_radiation?: number;
  solar_panel_efficiency?: number;
  annual_energy_production?: number;
  plant_life?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PowerGenerationCapacity {
  id: string;
  project_id: string;
  capacity: number;
  annual_generation: number;
  units_number: number;
  owner_id: string;
  commissioning_date?: string | Date | EthiopianDate;
  plant_life: number;
  others: string;
  created_at: string;
  updated_at: string;
}

export interface WindTurbine {
  id: string;
  project_id: string;
  turbine_manufacturer?: string;
  turbine_model?: string;
  rotor_diameter?: number;
  hub_height?: number;
  tower_type_id?: string;
  blade_length?: number;
  blades_number?: number;
  gearbox_type?: string;
  generator_type_id?: string;
  generators_number?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface WindResource {
  id: string;
  project_id: string;
  wind_speed_at_hub_height?: number;
  weibull_shape_factor?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RegulationAndPolicy {
  id: string;
  project_id: string;
  regulatory_body_overseeing_the_facility?: string;
  regulatory_compliance_monitoring?: boolean;
  environmental_and_social_regulation_compliance_monitoring?: boolean;
  licensing_and_permit_requirements?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface EnvironmentalAndSocialImpact {
  id: string;
  project_id: string;
  environmental_impact_assessment_conducted: boolean;
  mitigation_measures_implemented: boolean;
  social_impact_assessment_conducted: boolean;
  resettlement_and_compensation_measures_implemented: boolean;
  remark?: string;
  files?: any[];
  created_at?: string;
  updated_at?: string;
}
export interface TransmissionLineInformation {
  id: string;
  project_id: string;
  name: string;
  transmission_voltage?: number;
  transmission_line_route_length?: number;
  circuit_number?: number;
  starting_point_northing?: number;
  starting_point_easting?: number;
  ending_point_northing?: number;
  ending_point_easting?: number;
  lifetime?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReliabilityAndMaintenance {
  id: string;
  project_id: string;
  maintenance_frequency_id: string;
  total_outage_duration?: number;
  total_interruption_number?: number;
  saidi?: number;
  saifi?: number;
  automatic_fault_detection_restoration_system_installed?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Transmission {
  id: string;
  project_id: string;
  transmission_voltage?: number;
  distance_to_substation?: number;
  transmission_lines_number?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Dam {
  id: string;
  project_id: string;
  dam_type_id: string;
  dam_height?: number;
  spillway_type_id: string;
  penstock_length?: number;
  turbine_type_id: string;
  turbine_number?: number;
  generator_type_id: string;
  generator_number?: number;
  national_priority_rank?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface TransmissionLineConductorAndTowerData {
  id: string;
  transmission_line_id: string;
  name: string;
  conductor_type?: string;
  conductor_code_name_id: string;
  strands_number?: number;
  conductor_size?: number;
  conductors_per_phase_number?: number;
  tower_type_id: string;
  tower_height?: number;
  conductor_diameter?: number;
  each_strand_diameter?: number;
  tower_foundation_type_id: string;
  other_equipment?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface TransmissionLineEquipmentData {
  id: string;
  transmission_line_id: string;
  name: string;
  insulator_type?: string;
  ground_wire_type?: string;
  fiber_optics_number?: number;
  opgw_uts?: number;
  opgw_weight?: number;
  owner_operator?: string;
  tower_grounding?: string;
  tower_circuit_arrangement?: string;
  other_equipment?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface BroadcastingInfrastructureAge {
  id: string;
  project_id: string;
  name: string;
  broadcasting_infrastructure_id: string;
  antennas?: number;
  transmitters?: number;
  towers?: number;
  cables?: number;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface BroadcastingInfrastructureManufacturer {
  id: string;
  broadcasting_infrastructure_id: string;
  name: string;
  antennas?: string;
  transmitters?: string;
  towers?: string;
  cables?: string;
  others?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubstationTransformerAndSwitchgearData {
  id: string;
  transmission_line_id: string;
  name: string;
  transformers_number?: number;
  transformer_type?: string;
  transformer_capacity?: number;
  input_voltage_level?: number;
  output_voltage_level?: number;
  switchgear_type_id: string;
  circuit_breaker_type_id: string;
  other_equipment?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SubstationLayoutAndCommunicationData {
  id: string;
  substation_id: string;
  name: string;
  substation_layout?: string;
  equipped_with_standby_diesel_generator?: string;
  substation_busbar_type?: string;
  substation_communication_system_id: string;
  scada_system?: boolean;
  substation_grounding_system_id: string;
  substation_altitude_level?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MiniGridStation {
  id: string;
  substation_id: string;
  name: string;
  minigrid_size?: number;
  battery_type_id?: string;
  battery_size?: number;
  inverter?: number;
  system_voltage?: number;
  expected_annual_generation?: number;
  diesel_generator: 'Equipped' | 'Not Equipped';
  owner_operator?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MiniGridStationDistributionLine {
  id: string;
  mini_grid_station_id: string;
  name: string;
  system_type?: string;
  lines_type?: string;
  line_length?: number;
  poles: 'Concrete' | 'Wood' | 'Steel';
  transformer_type_id: string;
  transformers_number?: number;
  transformers_size?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MiniGridStationConsumer {
  id: string;
  mini_grid_station_id: string;
  name: string;
  residential?: number;
  commercial?: number;
  productive_industrial?: number;
  health_centers?: number;
  schools?: number;
  street_lighting?: number;
  other?: number;
  expected_electricity_sales?: number;
  electricity_tariff?: number;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MiniGridStationBackupPowerSource {
  id: string;
  mini_grid_station_id: string;
  name: string;
  capacity?: number;
  installation_year?: number;
  distribution_lines_total_length?: number;
  lifetime?: number;
  commissioning_date?: Date | string;
  other?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MiniGridStationDistributionLineInfrastructure {
  id: string;
  mini_grid_station_id: string;
  name: string;
  distribution_line_type_id: string;
  distribution_line_material_id: string;
  distribution_line_conductor_size?: number;
  voltage_level?: number;
  topology?: 'Radial' | 'Ring';
  switching_station_connection?: boolean;
  station_name?: string;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ElectricDistributionTransformer {
  id: string;
  project_id: string;
  name: string;
  service_area?: number;
  installation_year?: number;
  transformers_total_number?: number;
  gps_x_coordinates?: number;
  gps_y_coordinates?: number;
  fire_extinguishing_technology_id: string;
  other?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricDistributionTransformerType {
  id: string;
  project_id: string;
  mini_grid_station_id: string;
  name: string;
  transformer_type_id: string;
  cooling_type: 'Oil Immersed' | 'Dry type';
  transformer_power_rating?: number;
  lifetime?: number;
  protection_installed_id: string;
  safety_problems_encountered_id: string;
  work_accidents_number?: number;
  on_site_safety_regulation_implemented?: boolean;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricSmartMetersData {
  id: string;
  project_id: string;
  mini_grid_station_id: string;
  name: string;
  owner_operator?: string;
  facility_type: 'Oil Immersed' | 'Dry Type';
  service_area?: number;
  manufacturer?: string;
  model_id: string;
  smart_meter_type_id: string;
  installation_year?: number;
  smart_meters_installed_number?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricSmartMetersRatingsData {
  id: string;
  project_id: string;
  electric_smart_meters_data_id: string;
  name: string;
  active_reactive: string;
  kwh_kvarh_rating?: number;
  phase: string;
  maximum_current_rating?: number;
  other?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricSmartMetersPerformanceData {
  id: string;
  project_id: string;
  electric_smart_meters_data_id: string;
  name: string;
  maintenance_frequency_id: string;
  average_meter_lifespan?: number;
  average_meter_accuracy?: number;
  safety_problems_encountered?: string;
  work_accidents_number?: number;
  on_site_safety_regulation_implemented?: boolean;
  other?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricSmartMetersPrivacyAndSecurityData {
  id: string;
  project_id: string;
  electric_smart_meters_data_id: string;
  name: string;
  privacy_measures_implemented?: boolean;
  privacy_measures_type_id: string;
  customer_engagement_frequency_id: string;
  customer_engagement_programs_implemented?: boolean;
  customer_engagement_programs_type_id: string;
  social_impact_assessment_conducted?: boolean;
  resettlement_and_compensation_measures_implemented?: boolean;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricGridControlCenterData {
  id: string;
  project_id: string;
  mini_grid_station_id: string;
  name: string;
  installation_year?: number;
  control_system_type_id: string;
  communication_links_id: string;
  energy_management_system_capability?: boolean;
  remote_control_capability?: boolean;
  average_measured_data_reliability?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricGridControlCenterPerformanceAndMaintenance {
  id: string;
  project_id: string;
  electric_grid_control_center_data_id: string;
  name: string;
  maintenance_frequency_id: string;
  total_system_downtime_outage_duration?: number;
  total_interruptions_number?: number;
  saidi?: string;
  saifi?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElectricGridControlCenterCyberSecurityData {
  id: string;
  project_id: string;
  electric_grid_control_center_data_id: string;
  name: string;
  cyber_security_measures_implemented?: boolean;
  cyber_security_measures_type: string;
  cyber_security_audits_frequency: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RailwayTracksGeometryData {
  id: string;
  project_id: string;
  alignment?: string;
  gradient?: number;
  curvature_radius?: number;
  cant?: string;
  track_gauge?: string;
  cross_level?: string;
  track_surface_profile?: string;
  twist?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayTrackData {
  id: string;
  project_id: string;
  railway_track_infrastructure_type_id: string;
  track_type_id: string;
  track_gauge_id: string;
  track_length?: number;
  rail_type_and_size?: string;
  sleepers_type_and_spacing?: string;
  fastening_systems?: string;
  ballast_type_and_depth?: string;
  track_connection_method?: string;
  track_type?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RailwayTrackConditionAssessment {
  id: string;
  project_id: string;
  inspection_dates?: string | Date | EthiopianDate; // ISO date string
  track_condition_rating_id: string;
  observed_defects_id: string;
  track_settlement_irregularities?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayTrackMaintenanceAndInspection {
  id: string;
  project_id: string;
  scheduled_maintenance_activity_id: string;
  maintenance_method?: string;
  track_maintenance_frequency_id: string;
  recent_maintenance_date?: string;
  inspection_reports_and_findings?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RailwayTrackRehabilitationOrRenewal {
  id: string;
  project_id: string;
  track_renewal_history?: string;
  plans_or_schedules?: string;
  rehabilitation_renewal_methods_used_id: string;
  rehabilitation_renewal_types?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayTrackSafety {
  id: string; // Required string
  project_id: string; // Required UUID
  railway_track_safety_measures_id: string; // Required UUID
  track_inspection_frequency_id: string; // Required UUID
  is_compliant_with_safety_regulations_standards?: boolean; // Optional Boolean
  remark?: string; // Optional Text
  created_at?: string;
  updated_at?: string;
}
export interface RailwayBallast {
  id: string;
  project_id: string;
  railway_line_section_name: string;
  railway_ballast_name: string;
  ballast_id_no?: string;
  ballast_construction_cost?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayBallastMaterialData {
  id: string;
  project_id: string; // UUID
  railway_line_section_name: string;
  ballast_material_type_id: string; // UUID
  particle_size_distribution_grading?: string;
  ballast_used_quantity?: number; // DOUBLE
  ballast_source_id: string; // UUID
  ballast_material_size?: number; // DOUBLE
  ballast_layer_thickness?: number; // DOUBLE
  compaction_method_id: string; // UUID
  remark?: string; // TEXT
  created_at?: string;
  updated_at?: string;
}
export interface RailwayBallastMaterialSpecification {
  id: string;
  project_id: string; // UUID
  railway_line_section_name: string;
  ballast_material_type_id: string; // UUID
  specific_gravity?: number;
  porosity?: number;
  water_absorption?: number;
  shape?: string;
  average_particle_length?: number;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RailwayBallastConditionAssessment {
  id: string;
  project_id: string; // UUID
  railway_line_section_name: string;
  inspection_dates?: string | Date | EthiopianDate; // ISO date string

  ballast_condition_rating: BallastConditionRating;
  fouling_presence: FoulingPresence;
  ballast_degradation_indicators: BallastDegradationIndicators;
  ballast_quality_testing_method: BallastQualityTestingMethod;

  testing_frequency?: number;
  ballast_resistance?: string;

  ballast_degradation_rate: BallastDegradationRate;
  drainage_performance: DrainagePerformance;

  remark?: string;
  created_at?: string;
  updated_at?: string;
}
export enum BallastConditionRating {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor'
}

export enum FoulingPresence {
  Fines = 'Fines',
  Debris = 'Debris',
  Sediments = 'Sediments',
  Siltation = 'Siltation',
  Other = 'Other'
}

export enum BallastDegradationIndicators {
  Breakage = 'Breakage',
  Crack = 'Crack',
  Other = 'Other'
}

export enum BallastQualityTestingMethod {
  GradationTest = 'Gradation Test',
  SoundnessTest = 'Soundness Test',
  CompactionTest = 'Compaction Test',
  Other = 'Other'
}

export enum BallastDegradationRate {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor'
}

export enum DrainagePerformance {
  Excellent = 'Excellent',
  Good = 'Good',
  Fair = 'Fair',
  Poor = 'Poor'
}
// src/types/project/other.ts

export interface RailwayBallastMaintenanceAndRenewal {
  id: string;
  project_id: string; // UUID
  railway_line_section_name: string; // STRING
  scheduled_maintenance_activities: ScheduledMaintenanceActivities; // ENUM
  recent_maintenance_dates?: string | Date | EthiopianDate; // DATE (ISO date string)
  inspection_reports_findings?: string; // TEXT
  remark?: string; // TEXT
  created_at?: string;
  updated_at?: string;
}

export enum ScheduledMaintenanceActivities {
  Tamping = 'Tamping',
  Cleaning = 'Cleaning',
  RoutineMaintenance = 'Routine Maintenance',
  CorrectiveMaintenance = 'Corrective Maintenance',
  Other = 'Other'
}
// src/types/project/other.ts

export interface RailwayBallastDrainageAndWaterManagement {
  id: string;
  project_id: string; // UUID is typically represented as a string in TypeScript
  railway_line_section_name: string; // STRING
  drainage_condition_assessment?: string; // STRING, Optional
  drainage_infrastructure_type?: string; // STRING, Optional
  water_management_measures?: string; // TEXT, Optional
  drainage_infrastructure_length?: number; // DOUBLE, Optional
  remark?: string; // TEXT, Optional
  created_at?: string;
  updated_at?: string;
}
// src/types/project/other.ts

export interface RailwayBallastEnvironmentalAndOtherFactor {
  id: string; // Added id field
  project_id: string; // UUID is typically represented as a string in TypeScript
  railway_line_section_name: string; // STRING
  environmental_compliance_measures?: string; // TEXT, Optional
  environmental_impact_assessment?: string; // TEXT, Optional
  remark?: string; // TEXT, Optional
  created_at?: string;
  updated_at?: string;
}

// src/types/project/other.ts

export interface RailwaySubBallastMaterial {
  id: string; // Assuming 'id' will be added as a primary key like other models
  project_id: string; // UUID
  railway_line_section_name: string; // STRING
  sub_ballast_material_type_id: string; // UUID (FK to sub-ballast material type)
  layer_thickness?: number; // DOUBLE, Optional
  layer_depth?: number; // DOUBLE, Optional
  density?: number; // DOUBLE, Optional
  moisture_content?: number; // DOUBLE, Optional
  method_used_for_compaction?: string; // STRING, Optional
  compaction_density?: number; // DOUBLE, Optional
  remark?: string; // TEXT, Optional
  created_at?: string;
  updated_at?: string;
}
export interface RailwaySubBallastMaterialTest {
  id: string;
  project_id: string; // UUID, Foreign key to the project
  railway_line_section_name: string; // Name of the rail line section
  sub_ballast_material_type_id: string; // UUID, FK to sub-ballast material type
  testing_method_used?: string; // Description of the test method (e.g., compaction, gradation)
  sampling_method?: string; // Method used to collect the sample
  sample_size?: number; // DOUBLE, Size/volume of the sample taken
  material_source?: string; // Location or provider of the material
  sieve_analysis_results?: string; // Description or summary of sieve results
  supplier?: string; // Name of the material supplier
  remark?: string; // TEXT, Additional notes
  created_at?: string;
  updated_at?: string;
}

export interface RailwaySubBallastConditionAssessment {
  id: string; // UUID, typically added for database entities
  project_id: string; // UUID, References the associated project
  railway_line_section_name: string; // STRING, Name of the railway section
  sub_ballast_material_type_id: string; // UUID, FK to the sub-ballast material type
  inspection_dates?: string | Date | EthiopianDate; // ISO date string
  sub_ballast_condition_rating?: string; // STRING, Overall rating (e.g., "Good", "Poor")
  cracking_observations?: string; // STRING, Noted surface or subsurface cracks
  erosion_issues?: string; // STRING, Presence/type of erosion problems
  unwanted_vegetation_presence?: string; // STRING, Noted vegetation growth in the sub-ballast
  testing_frequency_per_year?: number; // INTEGER, Number of times testing is conducted yearly
  sub_ballast_resistance?: string; // STRING, Structural resistance capacity
  sub_ballast_degradation_rate?: string; // STRING, Speed of degradation over time
  drainage_performance?: string; // STRING, Assessment of water flow or drainage effectiveness
  remark?: string; // TEXT, Optional comments or findings

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
export interface RailwaySubBallastMaintenanceAndRenewal {
  id: string;
  project_id: string;
  railway_line_section_name: string; // String
  scheduled_maintenance_activities?: string; // String, Enum-like (e.g., Routine)
  sub_ballast_renewal_history?: string; // Text/String
  recent_maintenance_dates?: string | Date | EthiopianDate; // ISO date string
  inspection_reports_findings?: string; // Text/String
  remark?: string; // Text/String

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}

export interface RailwaySubBallastDrainageAndWaterManagement {
  id: string; // UUID, typically added for database entities
  project_id: string; // UUID, Required
  railway_line_section_name: string;
  drainage_condition_assessment?: string; // STRING, Not required
  drainage_infrastructure_type?: string; // STRING, Not required
  water_management_measures?: string; // TEXT, Not required
  drainage_infrastructure_length?: number; // DOUBLE, Not required
  remark?: string; // TEXT, Not required

  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
export interface RailwaySubBallastEnvironmentalAndOtherFactor {
  id: string; // UUID, typically added for database entities
  project_id: string; // UUID, Required
  railway_line_section_name: string; // STRING, Required
  environmental_compliance_measures?: string; // TEXT, Not required
  environmental_impact_assessment?: string; // TEXT, Not required
  remark?: string; // TEXT, Not required
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
export interface RailwaySleeperCharacteristic {
  id: string; // UUID, typically added for database entities
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  sleeper_type?: string; // String, Not required
  sleeper_size_and_dimensions?: number; // Double, Not required
  sleeper_distance_between_pairs?: string; // String, Not required
  sleeper_material_specification?: string; // String, Not required
  sleeper_spacing?: string; // String, Not required
  spacing_between?: number; // Double, Not required
  sleeper_shape?: string; // String, Not required
  remark?: string; // Text/String, Not required

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
// Add this interface to src/types/project/other.ts or a relevant types file

export interface RailwaySleeperConditionAssessment {
  id: string; // Assuming 'id' is still the primary key for individual records if not project_id
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  inspection_dates?: string | Date | EthiopianDate; // ISO date string
  sleeper_condition_rating?: string; // String, Not required, e.g., Excellent, Good, Poor
  defect_presence?: string; // String, Not required, e.g., Cracks, Chips
  sleeper_stability_and_alignment?: string; // String, Not required, Description of alignment
  sleepers_required_number?: number; // Integer, Not required, Number of replacement sleepers
  supplier_name?: string; // String, Not required
  supplier_phone?: string; // String, Not required
  remark?: string; // Text/String, Not required

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}

export interface RailwaySleeperMaintenanceAndReplacement {
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  scheduled_maintenance_activities?: string; // String, Not required, Description of scheduled work
  recent_maintenance_date?: string | Date | EthiopianDate; // Date, Not required, Date of the last maintenance
  inspection_reports?: string; // String, Not required, Summary of inspection
  sleeper_replacement_history?: string; // String, Not required, Replacement activities history
  remark?: string; // Text/String, Not required

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  id: string; // Assuming 'id' is still the primary key for individual records if not project_id
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
// Add this interface to src/types/project/other.ts or a relevant types file

export interface RailwaySleeperFasteningSystem {
  id: string; // Assuming 'id' is still the primary key for individual records if not project_id
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  used_fastening_systems_type?: string; // String, Not required
  fastener_condition_assessment?: string; // String, Not required
  remark?: string; // Text/String, Not required

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  created_at?: string; // DATETIME, timestamp of creation
  updated_at?: string; // DATETIME, timestamp of last update
}
// Add this interface to src/types/project/other.ts or a relevant types file

export interface RailwaySleeperEnvironmentalAndOtherFactor {
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  environmental_compliance_measures?: string; // String/Text, Not required
  environmental_impact_assessment?: string; // String/Text, Not required
  remark?: string; // Text/String, Not required

  // Optional: Add common fields like 'id', 'created_at', 'updated_at' if they are part of your typical models
  id: string;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayFasteningSystemCharacteristic {
  id: string; // Assuming an 'id' will be generated by the backend
  project_id: string; // UUID
  railway_line_section_name: string; // String, Required
  used_fastening_system_type?: string | null; // String, Optional
  fastening_system_manufacturer_supplier?: string | null; // String, Optional
  fastening_system_specifications?: string | null; // String, Optional
  rail_clips_or_clamps_details?: string | null; // Text/String, Optional
  bolts_and_nuts_specifications?: string | null; // Text/String, Optional
  other_fastening_system?: string | null; // Text/String, Optional
  remark?: string | null; // Text/String, Optional
  created_at?: string;
  updated_at?: string;
}
export interface RailwayFasteningSystemConditionAssessment {
  id: string; // Assuming an 'id' will be generated by the backend
  project_id: string; // UUID, Required
  railway_line_section_name: string; // String, Required
  inspection_date?: string | Date | EthiopianDate; // ISO date string
  fastening_system_condition_rating?: string | null; // String, Optional
  defect_presence?: string | null; // String, Optional
  fastening_system_stability_and_alignment?: string | null; // String, Optional
  rail_fastening_model_number?: string | null; // String, Optional
  rail_fastening_needed_quantity?: number | null; // Integer, Optional
  rail_fastening_expected_lifespan?: number | null; // Integer, Optional
  rail_fastening_availability?: boolean | null; // Boolean, Optional
  remark?: string | null; // Text/String, Optional
  created_at?: string;
  updated_at?: string;
}

export interface RailwayFasteningSystemMaintenanceAndReplacement {
  id: string;
  project_id: string;
  railway_line_section_name: string;
  scheduled_maintenance_activities?: string | null;
  recent_maintenance_records_and_dates?: string | null;
  remark?: string | null;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayFasteningSystemEnvironmentalFactor {
  id: string;
  project_id: string;
  railway_line_section_name: string;
  environmental_compliance_measures?: string | null;
  environmental_impact_assessment?: string | null;
  remark?: string | null;
  created_at?: string;
  updated_at?: string;
}
export interface RailwaySignalingSystem {
  id: string;
  project_id: string;
  railway_line_section_name: string;
  signaling_system_type?: string | null;
  signaling_system_manufacturer_or_supplier_name?: string | null;
  signaling_system_manufacturer_or_supplier_phone?: string | null;
  signaling_system_components?: string | null;
  remark?: string | null;
  created_at?: string;
  updated_at?: string;
}
export interface RailwayCommunicationSystem {
  id?: string;
  project_id: string; //
  railway_line_section_name: string; //
  communication_system_type?: string | null; //
  communication_system_protocols_or_standards?: string | null; //
  communication_system_components?: string | null; //
  signaling_system_components?: string | null; // 
  remark?: string | null; //
  created_at?: string;
  updated_at?: string;
}
export interface RailwaySystemConditionAssessment {
  id?: string;
  project_id: string; //
  railway_line_section_name: string; //
  system_condition_rating_or_assessment?: string | null; //
  defect_presence?: boolean | null; //
  system_performance_indicators?: string | null; //
  power_supply_systems_and_communication?: string | null; //
  remark?: string | null; //
  created_at?: string;
  updated_at?: string;
}