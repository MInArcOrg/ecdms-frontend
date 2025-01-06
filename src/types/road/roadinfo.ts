interface Pagination {
    page: number;
    pageSize: number;
    total: number;
  }
  
  export interface RoadInfo {
    id: string;
    material: string;
    location_function: string;
    traffic_volume: number;
    traffic_type: string;
    economy: string;
    rigidity: string;
    topography: string;
    project_id: string;
    created_at: Date;
    updated_at:  Date;
    files: File[];
  }
  
  export interface RoadInfoState {
    roadInfoData: RoadInfo[];
    formData: RoadInfo;
    loading: boolean;
    snackbar: { open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' };
    pagination: { page: number; pageSize: number; total: number };
  }
  
  
  export interface Action {
    type: string;
    payload: any;
  }
  