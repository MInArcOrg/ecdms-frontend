// src/views/project/other/railway-maintenance-facility-type-and-purpose/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_MAINTENANCE_FACILITY_TYPE_AND_PURPOSE_ENTITY_SUBJECT = 'railwaymaintenancefacilitytypeandpurpose';

// 2. File Types Array (Only one main file type)
export const RAILWAY_MAINTENANCE_FACILITY_TYPE_AND_PURPOSE_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_MAINTENANCE_FACILITY_TYPE_AND_PURPOSE',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-maintenance-facility-type-and-purpose.file-types.main-document',
        descriptionTKey: 'common.form.main-document-upload'
    }
];