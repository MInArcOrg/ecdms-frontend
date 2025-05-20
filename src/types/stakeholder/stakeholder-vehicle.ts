export interface StakeholderVehicle {
    id?: string;
    stakeholder_id: string;
    vehicle_name: string;
    plate_number: string;
    brand_name?: string;
    model: string;
    year?: number;
    chassis_number?: string;
    engine_number?: string;
    capacity?: string;
    purpose?: string;
    quantity?: number;
    current_situation?: string;
    location?: string;
    created_at: Date; // Timestamp for creation
    updated_at: Date; // Timestamp for updates
}