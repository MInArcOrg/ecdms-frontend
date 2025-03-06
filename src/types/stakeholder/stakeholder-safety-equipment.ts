export interface SafetyEquipment {
  id?: string;
  stakeholder_id: string;
  name: string;
  serial_no?: string;
  brand_name?: string;
  model: string;
  year?: number;
  capacity?: string;
  purpose?: string;
  quantity?: number;
  current_situation?: string;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}
