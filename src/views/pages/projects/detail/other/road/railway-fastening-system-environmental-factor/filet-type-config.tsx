export interface FileTypeConfig {
  type: string;
  key: string;
  titleTKey: string;
  descriptionTKey: string;
}

export const RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES = [
  {
    type: 'FASTENING_SYSTEM_CONDITION_DOCUMENTATION',
    key: 'fasteningSystemConditionDocumentation',
    titleTKey: 'project.other.railway-fastening-system-environmental-factor.details.fastening_system_condition_documentation',
    descriptionTKey: 'common.form.file-upload'
  },
  {
    type: 'DEFAULT_FILES',
    key: 'defaultFiles',
    titleTKey: 'common.form.file-upload',
    descriptionTKey: 'common.form.file-upload'
  }
] as const satisfies ReadonlyArray<FileTypeConfig>;

export type RailwayFasteningSystemEnvironmentalFactorFileKey =
  (typeof RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_FILE_TYPES)[number]['key'];

export const RAILWAY_FASTENING_SYSTEM_ENVIRONMENTAL_FACTOR_ENTITY_SUBJECT = 'railwayfasteningsystemenvironmentalfactor';
