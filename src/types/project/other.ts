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
