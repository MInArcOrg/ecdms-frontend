export interface FileTypeConfig {
    type: string;
    key: string; // Used for translation keys or form state names
    titleTKey: string; // Title translation key for display
    descriptionTKey: string; // Form description translation key
}

export const RAILWAY_POWER_DISTRIBUTION_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_POWER_DISTRIBUTION',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-power-distribution.file-types.main-document',
        descriptionTKey: 'common.form.railway-power-distribution-main-document-upload'
    },
    {
        type: 'DISTRIBUTION_NETWORK_LAYOUT_CONFIGURATION',
        key: 'networkLayout',
        titleTKey: 'project.other.railway-power-distribution.file-types.distribution-network-layout',
        descriptionTKey: 'common.form.distribution-network-layout-document-upload'
    },
    {
        type: 'FEEDER_ROUTE_SECTION',
        key: 'feederRoute',
        titleTKey: 'project.other.railway-power-distribution.file-types.feeder-route-section',
        descriptionTKey: 'common.form.feeder-route-section-document-upload'
    },
    {
        type: 'DISTRIBUTION_TRANSFORMER_SPECIFICATION',
        key: 'transformerSpec',
        titleTKey: 'project.other.railway-power-distribution.file-types.distribution-transformer-specification',
        descriptionTKey: 'common.form.distribution-transformer-specification-document-upload'
    }
];

export const RAILWAY_POWER_DISTRIBUTION_ENTITY_SUBJECT = 'railwaypowerdistribution';