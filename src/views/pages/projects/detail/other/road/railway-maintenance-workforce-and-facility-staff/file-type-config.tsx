// src/views/project/other/railway-maintenance-workforce-and-facility-staff/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_ENTITY_SUBJECT = 'railwaymaintenanceworkforceandfacilitystaff';

// 2. File Types Array (Only one main file type)
export const RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-maintenance-workforce-and-facility-staff.file-types.main-workforce-doc',
        descriptionTKey: 'common.form.main-workforce-doc-upload'
    }
];