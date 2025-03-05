export interface StakeholderMachinery {
  id?: string;
  stakeholder_id: string;
  name: string;
  plate_no: string;
  brand_name?: string;
  model: string;
  year?: number;
  chassis_number?: string;
  engine_number: string;
  capacity?: string;
  purpose?: string;
  quantity?: number;
  current_situation?: string;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}
