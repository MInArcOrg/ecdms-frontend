import EthiopianDate from 'src/views/components/custom/ethio-calendar/ethiopian-date';

export interface StakeholderCertificate {
  id: string;
  parent_id?: string;
  stakeholder_id: string;
  type?: string;
  title: string;
  description?: string;
  certificate_no?: string;
  date_of_issue?: string | Date | EthiopianDate;
  expiry_date?: string | Date | EthiopianDate;
  initial_certificate_no?: string;
  initial_certificate_issue_date?: string | Date | EthiopianDate;
  file_id?: string;
  revision_no?: number;
  created_at?: Date;
  updated_at?: Date;
}
