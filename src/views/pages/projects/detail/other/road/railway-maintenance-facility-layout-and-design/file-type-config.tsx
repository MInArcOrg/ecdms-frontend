// src/views/project/other/railway-maintenance-facility-layout-and-design/file-type-config.ts

// Define the core type structure for a file configuration item
export interface FileTypeConfig {
    type: string;
    key: string; // Used for form state names (e.g., 'recentRecords')
    titleTKey: string; // Title translation key for card/drawer display
    descriptionTKey: string; // Form description translation key
}

// 1. Entity Subject Constant
export const RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_ENTITY_SUBJECT = 'railwaymaintenancefacilitylayoutanddesign';

// 2. File Types Array (Only one main file type)
export const RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN',
        key: 'mainDocument',
        titleTKey: 'project.other.railway-maintenance-facility-layout-and-design.file-types.main-layout-design',
        descriptionTKey: 'common.form.main-layout-design-upload'
    }
];