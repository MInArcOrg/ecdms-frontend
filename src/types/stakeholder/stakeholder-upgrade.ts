export interface StakeholderUpgrade {
    id?: string; // UUID, required
    stakeholder_id: string; // UUID, required
    upgrade_type: string; // required
    previous_level?: string;
    upgraded_level?: string;
    ownership_percentage?: number;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}