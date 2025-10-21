// src/views/project/other/railway-power-supply-maintenance-and-testing/filet-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_ENTITY_SUBJECT = 'railwaypowersupplymaintenanceandtesting';

// 2. File Types Array
export const RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-power-supply-maintenance-and-testing.file-types.main-document',
        descriptionTKey: 'common.form.maintenance-testing-main-document-upload'
    },
    {
        type: 'RECENT_MAINTENANCE_RECORDS_FILE',
        key: 'recentRecords',
        titleTKey: 'project.other.railway-power-supply-maintenance-and-testing.file-types.recent-records',
        descriptionTKey: 'common.form.recent-maintenance-records-upload'
    }
];