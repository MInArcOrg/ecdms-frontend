import EthiopianDate from "src/views/components/custom/ethio-calendar/ethiopian-date";

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
    service_periods:string;
    inauguration_date?: string | Date | EthiopianDate;
    revision_no?: number;
    created_at?: string|Date;
    updated_at?: string|Date;
  }
  export interface BuildingDimensionDetail{
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
    id: string; // UUID
    parent_id?: string; // UUID
    project_id: string; // UUID
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
    id: string; // UUID
    parent_id?: string; // UUID (optional)
    project_id: string; // UUID
    segment_id: string; // UUID
    segment:RoadSegment
    name?: string; // Optional string
    number?: number; // Optional integer
    thickness?: number; // Optional double (float) - corrected typo from "thickeness" to "thickness"
    material?: string; // Optional string
    specifications?: string; // Optional string
    description?: string; // Optional text
    revision_no?: number; // Optional integer
    created_at?: Date; // Optional date (if using TypeScript, adjust as per your needs)
    updated_at?: Date; // Optional date (if using TypeScript, adjust as per your needs)
  }