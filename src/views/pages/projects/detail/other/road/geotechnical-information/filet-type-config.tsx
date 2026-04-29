export interface FileTypeConfig {
  type: string;
  key: string;
  titleTKey: string;
  descriptionTKey: string;
}

export const GEOTECHNICAL_INFORMATION_FILE_TYPES = [
  {
    type: 'SEISMIC_DESIGN',
    key: 'seismicDesign',
    titleTKey: 'project.other.geotechnical-information.file-types.seismic-design',
    descriptionTKey: 'common.form.file-upload'
  },
  {
    type: 'GEOTECHNICAL_REPORT',
    key: 'geotechnicalReport',
    titleTKey: 'project.other.geotechnical-information.file-types.geotechnical-report',
    descriptionTKey: 'common.form.file-upload'
  },
  {
    type: 'FOUNDATION_DESIGN',
    key: 'foundationDesign',
    titleTKey: 'project.other.geotechnical-information.file-types.foundation-design',
    descriptionTKey: 'common.form.file-upload'
  }
] as const satisfies ReadonlyArray<FileTypeConfig>;

export type GeotechnicalInformationFileKey = (typeof GEOTECHNICAL_INFORMATION_FILE_TYPES)[number]['key'];

export const GEOTECHNICAL_INFORMATION_ENTITY_SUBJECT = 'geotechnicalinformation';
