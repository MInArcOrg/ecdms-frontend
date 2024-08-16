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