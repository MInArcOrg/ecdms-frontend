
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_ENTITY_SUBJECT = 'railwaypowersupplyenvironmentalandotherfactor';

// 2. File Types Array
export const RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'ENVIRONMENTAL_IMPACT_ASSESSMENT',
        key: 'environmentalImpact',
        titleTKey: 'project.other.railway-power-supply-environmental-and-other-factor.file-types.environmental-impact-assessment',
        descriptionTKey: 'common.form.environmental-impact-assessment-upload'
    },
    {
        type: 'SYSTEM_DOCUMENTATION',
        key: 'systemDocumentation',
        titleTKey: 'project.other.railway-power-supply-environmental-and-other-factor.file-types.system-documentation',
        descriptionTKey: 'common.form.system-documentation-upload'
    },
    {
        type: 'STATION_PLATFORM_PHOTO',
        key: 'stationPlatformPhoto',
        titleTKey: 'project.other.railway-power-supply-environmental-and-other-factor.file-types.station-platform-photo',
        descriptionTKey: 'common.form.station-platform-photo-upload'
    },
    {
        type: 'RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-power-supply-environmental-and-other-factor.file-types.main-document',
        descriptionTKey: 'common.form.main-document-upload'
    }
];