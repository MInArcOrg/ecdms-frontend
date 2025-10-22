// src/views/project/other/railway-power-supply-safety-and-compliance/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_ENTITY_SUBJECT = 'railwaypowersupplysafetyandcompliance';

// 2. File Types Array
export const RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'INCIDENT_ACCIDENT_RECORDS_TYPE',
        key: 'incidentRecords',
        titleTKey: 'project.other.railway-power-supply-safety-and-compliance.file-types.incident-accident-records',
        descriptionTKey: 'common.form.incident-accident-records-upload'
    },
    {
        type: 'RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-power-supply-safety-and-compliance.file-types.main-document',
        descriptionTKey: 'common.form.main-document-upload'
    }
];