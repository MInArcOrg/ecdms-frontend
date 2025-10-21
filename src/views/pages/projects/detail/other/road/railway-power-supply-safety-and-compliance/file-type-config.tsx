// src/views/project/other/railway-power-supply-safety-and-compliance/file-type-config.ts

export interface FileTypeConfig {
    type: string;
    titleTKey: string; // Title translation key for card/drawer display
    key: string; // Key used for form state and file handling
}
// The entity subject for permission checks (e.g., in the create button)
export const RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_ENTITY_SUBJECT =
    'RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE';

// File types defined in the schema (image_db8c3b.png)
export const RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'INCIDENT_ACCIDENT_RECORDS_TYPE', // File type 1 from image_db8c3b.png
        titleTKey: 'common.form.safety-protocols-document-upload',
        key: 'safetyProtocolsFile'

    },
    {
        type: 'RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE', // File type 2 from image_db8c3b.png
        titleTKey: 'common.form.compliance-certificates-upload',
        key: 'complianceCertificatesFile'
    }
];