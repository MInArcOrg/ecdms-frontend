import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

// Define the enum for training types
export enum TrainingType {
  TRAINING = 'TRAINING',
  SUPPORT = 'SUPPORT'
}

export interface StakeholderTraining {
  id: string;
  parent_id?: string;
  stakeholder_id: string;
  title: string;
  type: TrainingType; // Use the enum here
  description?: string;
  provider: string;
  provision_date?: string | Date | EthiopianDate;
  quantity?: number;
  file_id?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
