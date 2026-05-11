export interface StakeholderMaterial {
  id?: string;
  parent?: string;
  stakeholder_id: string;
  material_category: string;
  material_subcategory?: string;
  name: string;
  description?: string;
  purpose?: string;
  quantity?: number;
  unit_price?: number;
  current_situation?: string;
  location?: string;
  created_at?: Date;
  updated_at?: Date;
}
