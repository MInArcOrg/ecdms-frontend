import EthiopianDate from "src/views/components/custom/ethio-calendar/ethiopian-date";

export interface StakeholderCertificate {
  id: string;
  stakeholder_id: string;
  type: string;
  title: string;
  scope: string;
  certifying_body: string;
  certification_number: string;
  issue_date?: string | Date | EthiopianDate;
  expire_date?: string | Date | EthiopianDate;
  remark?: string;
  created_at: Date;
  updated_at: Date;
}
