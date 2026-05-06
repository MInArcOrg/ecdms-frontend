export interface FileTypeConfig {
  type: string;
  key: string;
  titleTKey: string;
  descriptionTKey: string;
}

export const ENVIRONMENTAL_DATA_FILE_TYPES = [
  {
    type: 'ENVIRONMENTAL_IMPACT_ASSESSMENT',
    key: 'environmentalImpactAssessment',
    titleTKey: 'project.other.environmental-data.file-types.impact-assessment',
    descriptionTKey: 'common.form.file-upload'
  },
  {
    type: 'COMMUNITY_FEEDBACK',
    key: 'communityFeedback',
    titleTKey: 'project.other.environmental-data.file-types.community-feedback',
    descriptionTKey: 'common.form.file-upload'
  },
  {
    type: 'MITIGATION_MEASURES',
    key: 'mitigationMeasures',
    titleTKey: 'project.other.environmental-data.file-types.mitigation-measures',
    descriptionTKey: 'common.form.file-upload'
  }
] as const satisfies ReadonlyArray<FileTypeConfig>;

export type EnvironmentalDataFileKey = (typeof ENVIRONMENTAL_DATA_FILE_TYPES)[number]['key'];

export const ENVIRONMENTAL_DATA_ENTITY_SUBJECT = 'environmentaldata';

