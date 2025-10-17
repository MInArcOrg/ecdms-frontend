import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

export interface StakeholderLicense {
  id: string; // UUID
  stakeholder_id: string; // UUID
  license_type: string;
  license_category: string;
  license_name: string;
  license_scope: string;
  licensing_body: string;
  license_number: string;
  issue_date?: string | Date | EthiopianDate;
  expire_date?: string | Date | EthiopianDate;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}
