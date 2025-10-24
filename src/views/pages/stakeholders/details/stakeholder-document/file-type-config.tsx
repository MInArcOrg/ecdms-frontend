// src/views/stakeholder/document/file-type-config.ts

export interface FileTypeConfig {
    type: string;
    key: string;
    titleTKey: string;
    descriptionTKey: string;
}

// 1. Entity Subject Constant
export const STAKEHOLDER_DOCUMENT_ENTITY_SUBJECT = 'stakeholder-document';

// 2. Document Types Array
export const DOCUMENT_TYPE_VARIANTS = [
    'STRATEGY',
    'PLANNING',
    'RESEARCH',
    'INNOVATION',
    'CODE_OF_CONDUCT',
    'MANUAL',
    'OTHER_DOCUMENT'
] as const;
export type DocumentTypeVariant = typeof DOCUMENT_TYPE_VARIANTS[number];

export const documentTypeVariantObjects: {
    strategy: { value: 'STRATEGY'; name: string };
    planning: { value: 'PLANNING'; name: string };
    research: { value: 'RESEARCH'; name: string };
    innovation: { value: 'INNOVATION'; name: string };
    codeOfConduct: { value: 'CODE_OF_CONDUCT'; name: string };
    manual: { value: 'MANUAL'; name: string };
    otherDocument: { value: 'OTHER_DOCUMENT'; name: string };
} = {
    strategy: {
        value: 'STRATEGY',
        name: 'Strategy'
    },
    planning: {
        value: 'PLANNING',
        name: 'Planning'
    },
    research: {
        value: 'RESEARCH',
        name: 'Research'
    },
    innovation: {
        value: 'INNOVATION',
        name: 'Innovation'
    },
    codeOfConduct: {
        value: 'CODE_OF_CONDUCT',
        name: 'Code of Conduct'
    },
    manual: {
        value: 'MANUAL',
        name: 'Manual'
    },
    otherDocument: {
        value: 'OTHER_DOCUMENT',
        name: 'Other Document'
    }
}


// 3. File Types Array (General file type for uploads)
export const STAKEHOLDER_DOCUMENT_FILE_TYPES: FileTypeConfig[] = [
    {
        type: 'STAKEHOLDER_DOCUMENT',
        key: 'documentFile',
        titleTKey: 'stakeholder.document.file-types.document-file',
        descriptionTKey: 'common.form.document-file-upload'
    }
];