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
  specifications?: string;
  no_of_layers?: number;
  length?: number;
  width?: number;
  remark?: string;
  start_northing?: number;
  start_easting?: number;
  end_northing?: number;
  end_easting?: number;
  revision_no?: number;
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



export interface BridgeFoundation {
  id: string;
  project_id: string;
  name: string;
  bridge_name: string;
  abutment_a1_height?: number;
  abutment_a1_width?: number;
  abutment_a2_height?: number;
  abutment_a2_width?: number;
  wing_wall_length?: number;
  pier_type_id: string;
  piers_number?: number;
  piers_dimension?: string;
  pier1_height?: number;
  pier1_width?: number;
  pier2_height?: number;
  pier2_width?: number;
  created_at: Date;
  updated_at: Date;
}

export interface BridgeSubStructure {
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
export interface BridgeStructureInformation {
  id: string
  project_id: string
  name: string
  bridge_name: string
  river_width?: number
  highest_water_level?: number
  lowest_water_level?: number
  area_topography_id: string
  detour_possibility?: boolean
  road_alignment?: string
  altitude?: number
  load_limit_sign?: boolean
  created_at: Date
  updated_at: Date
}
export interface BridgeAreaData {
  id: string
  project_id: string
  bridge_structure_type_id: string
  span_number?: number
  span_composition?: string
  total_span_length?: number
  carriage_width?: number
  side_walk_width?: number
  lane_number?: number
  span_support_type_id: string
  deck_slab_type_id: string
  girder_number?: number
  girder_depth?: number
  girder_spacing?: number
  girder_width?: number
  created_at: Date
  updated_at: Date
}
export interface BridgeSuperStructure {
  id: string
  project_id: string
  name: string
  bridge_part_defect_id: string
  damage_type_id: string
  damage_condition_id: string
  hydrology_defect_id: string
  maintenance_action?: string
  bridge_history?: string
  inspector_remark?: string
  created_at: Date
  updated_at: Date
}

export interface BridgeInspection {
  bridge_structure_type_id: string
  east_region?: number
  west_region?: number
  central_region?: number
  north_region?: number
  south_region?: number
  ring_road?: number
  remark?: string
  created_at: Date
  updated_at: Date
}
export interface TrafficVolume {
  id: string
  project_id: string
  name: string
  count_type_id: string
  count_location_coordinate_x?: number
  count_location_coordinate_y?: number
  count_time?: Date
  lane_number?: number
  vehicle_number_per_hour?: number
  average_daily_traffic_volume?: number
  corridor_importance_level?: number
  created_at: Date
  updated_at: Date
}
export interface RoadProjectQualityControl {
  id: string
  project_id: string
  name: string
  project_phase_id: string
  inspection_type_id: string
  defect_encountered?: string
}
export interface RoadDrainage {
  id: string
  project_id: string
  name: string
  length?: number
  height?: number
  width?: number
  current_condition_id: string
  weight_limit?: number
  design_life_span?: number
  inspection_frequency?: number
  construction_completion_year?: number
  remark?: string
  created_at: Date
  updated_at: Date
}
export interface EnvironmentalData {
  id: string;
  project_id: string;
  remark: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface RoadMaintenanceData {
  id: string
  project_id: string
  road_segment: string
  maintenance_start_date?: Date
  maintenance_end_date?: Date
  weather_condition?: string
  pavement_condition?: string
  remark?: string
  created_at?: Date
  updated_at?: Date
}
