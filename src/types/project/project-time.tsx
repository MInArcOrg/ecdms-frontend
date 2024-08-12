import EthiopianDate from "src/views/components/custom/ethio-calendar/ethiopian-date";

export interface ProjectTime {
    id: string;
    parent_id?: string;
    project_id: string;
    contract_signing_date?: string | Date | EthiopianDate;
    site_handover_date?: string | Date | EthiopianDate;
    mobilization_days_no?: number;
    commencement_date?: string | Date | EthiopianDate;
    project_completion_date?: string | Date | EthiopianDate;
    original_contract_duration?: number;
    revision_no?: number;
    current_date: Date;
    created_at: string;
    updated_at: string;
}
