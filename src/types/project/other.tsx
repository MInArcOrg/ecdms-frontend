import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

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
  exterior_walls?: string; // STRING
  roof_assembly?: string; // STRING
  exterior_windows?: string; // STRING
  exterior_doors?: string; // STRING
  shading_components?: string; // STRING
  file_id?: string; // STRING
  remark?: string; // TEXT
  revision_no?: number; // INTEGER
  created_at?: Date; // TIMESTAMP
  updated_at?: Date; // TIMESTAMP
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
  name?: string; // Optional string
  number?: number; // Optional integer
  thickness?: number; // Optional double (float) - corrected typo from "thickness" to "thickness"
  material?: string; // Optional string
  specifications?: string; // Optional string
  description?: string; // Optional text
  revision_no?: number; // Optional integer
  created_at?: Date; // Optional date (if using TypeScript, adjust as per your needs)
  updated_at?: Date; // Optional date (if using TypeScript, adjust as per your needs)
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
  id: string; // UUID
  parent_id?: string; // UUID, optional
  project_id: string; // UUID, required
  dam_volume?: string; // optional
  total_capacity?: string; // optional
  active_capacity?: string; // optional
  inactive_capacity?: string; // optional
  catchment_area?: number; // optional
  surface_area?: number; // optional
  revision_no?: number; // optional
  created_at: Date; // Date, required
  updated_at: Date; // Date, required
}
export interface SpillwayInfo {
  id: string; // UUID
  parent_id?: string; // UUID, optional
  project_id: string; // UUID, required
  name?: string; // optional
  type?: string; // optional
  quantity?: number; // optional
  specifications?: string; // optional (TEXT in Sequelize is string in TypeScript)
  capacity?: number; // optional (DOUBLE in Sequelize is number in TypeScript)
  revision_no?: number; // optional
  created_at: Date; // Date, required
  updated_at: Date; // Date, required
}
export interface IrrigationCapacity {
  id: string; // UUID
  parent_id?: string; // UUID, optional
  project_id: string; // UUID, required
  designed_irrigation_capacity?: number; // optional
  actual_irrigation_capacity?: number; // optional
  revision_no?: number; // optional
  created_at?: Date; // optional, automatically managed by Sequelize
  updated_at?: Date; // optional, automatically managed by Sequelize
}
export interface WaterIrrigationDam {
  id: string; // UUID
  parent_id?: string; // UUID, optional
  project_id: string; // UUID, required
  dam_volume?: number; // optional
  total_capacity?: number; // optional
  active_capacity?: number; // optional
  inactive_capacity?: number; // optional
  catchment_area?: number; // optional
  surface_area?: number; // optional
  revision_no?: number; // optional
  created_at?: Date; // optional, typically managed by the database
  updated_at?: Date; // optional, typically managed by the database
}
