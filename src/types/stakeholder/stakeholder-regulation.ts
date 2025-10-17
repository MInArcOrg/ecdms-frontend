import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

export interface StakeholderRegulation {
  id: string; // UUID
  parent_id?: string; // Optional UUID
  stakeholder_id: string; // UUID (Required)
  title: string; // Required string
  description?: string; // Optional text
  prepared_by: string; // Required string
  effective_start_date?: string | Date | EthiopianDate; // Required date
  effective_end_date?: string | Date | EthiopianDate; // Required date
  revision_no?: number; // Optional integer
  created_at?: Date; // Automatically managed by Sequelize
  updated_at?: Date; // Automatically managed by Sequelize
}
