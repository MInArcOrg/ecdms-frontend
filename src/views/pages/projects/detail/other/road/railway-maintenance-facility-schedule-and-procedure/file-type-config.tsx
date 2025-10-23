// src/views/project/other/railway-maintenance-facility-schedule-and-procedure/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_ENTITY_SUBJECT = 'railwaymaintenancefacilityscheduleandprocedure';

// 2. File Types Array (Only one main file type)
export const RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE',
        key: 'mainScheduleDoc',
        titleTKey: 'project.other.railway-maintenance-facility-schedule-and-procedure.file-types.main-schedule-doc',
        descriptionTKey: 'common.form.main-schedule-doc-upload'
    }
];