export const stakeholderMasterModels = {
    ownershiptype: {
        model: 'OwnershipType',
        dbModel: 'ownertype',
        title: 'ownership-types',
        createTitle: 'create-ownership-type',
        editTitle: 'edit-ownership-type',
        fileType: 'OWNERSHIP_TYPE',
        flag: 'EDUCATION_INSTITUTION'
    },
    businessfield: {
        model: 'BusinessField',
        dbModel: 'businessfield',
        title: 'business-fields',
        createTitle: 'create-business-field',
        editTitle: 'edit-business-field',
        fileType: 'BUSINESS_FIELD',
        flag: 'EDUCATION_INSTITUTION'
    },
    studylevel: {
        model: 'StudyLevel',
        dbModel: 'studylevel',
        title: 'study-levels',
        createTitle: 'create-study-level',
        editTitle: 'edit-study-level',
        fileType: 'STUDY_LEVEL',
        flag: 'EDUCATION_INSTITUTION'
    },
    studyprogram: {
        model: 'StudyProgram',
        dbModel: 'studyprogram',
        title: 'study-programs',
        createTitle: 'create-study-program',
        editTitle: 'edit-study-program',
        fileType: 'STUDY_PROGRAM',
        flag: 'EDUCATION_INSTITUTION'
    },
    studyfield: {
        model: 'StudyField',
        dbModel: 'studyfield',
        title: 'study-fields',
        createTitle: 'create-study-field',
        editTitle: 'edit-study-field',
        fileType: 'STUDY_FIELD',
        flag: 'EDUCATION_INSTITUTION'

    },
    agelevel: {
        model: 'AgeLevel',
        dbModel: 'agelevel',
        title: 'age-levels',
        createTitle: 'create-age-level',
        editTitle: 'edit-age-level',
        fileType: 'AGE_LEVEL',
        flag: 'EDUCATION_INSTITUTION'
    },
    experiencelevel: {
        model: 'ExperienceLevel',
        dbModel: 'experiencelevel',
        title: 'experience-levels',
        createTitle: 'create-experience-level',
        editTitle: 'edit-experience-level',
        fileType: 'EXPERIENCE_LEVEL',
        flag: 'EDUCATION_INSTITUTION'
    },
    upgradeType: {
        model: 'UpgradeType',
        dbModel: 'upgradetype',
        title: 'upgrade-types',
        createTitle: 'create-upgrade-type',
        editTitle: 'edit-upgrade-type',
        fileType: 'UPGRADE_TYPE',
        flag: 'EDUCATION_INSTITUTION'
    }
}
export type StakeholderMasterModel = {
    model: string;
    dbModel: string;
    title: string;
    createTitle: string;
    editTitle: string;
    fileType: string;
    flag?: string;
};
export type StakeholderMasterModelKey = keyof typeof stakeholderMasterModels;

export type StakeholderMasterModels = {
    [K in StakeholderMasterModelKey]: StakeholderMasterModel;
};
