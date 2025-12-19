export interface StakeholderVehicle {
  id?: string;
  stakeholder_id: string;
  vehicle_name: string;
  plate_number: string;
  brand_name?: string;
  model: string;
  year?: number;
  chassis_number?: string;
  engine_number?: string;
  capacity?: string;
  purpose?: string;
  quantity?: number;
  current_situation?: string;
  latitude?: number;
  longitude?: number;
  created_at: Date; // Timestamp for creation
  updated_at: Date; // Timestamp for updates
}
