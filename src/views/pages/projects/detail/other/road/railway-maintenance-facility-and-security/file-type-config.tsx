// src/views/project/other/railway-maintenance-facility-and-security/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_ENTITY_SUBJECT = 'railwaymaintenancefacilityandsecurity';

// 2. File Types Array (Only one main file type)
export const RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY',
        key: 'securityDoc',
        titleTKey: 'project.other.railway-maintenance-facility-and-security.file-types.security-doc',
        descriptionTKey: 'common.form.security-doc-upload'
    }
];