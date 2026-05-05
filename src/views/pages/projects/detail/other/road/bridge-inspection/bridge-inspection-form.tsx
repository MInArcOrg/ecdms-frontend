import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import { dropDownConfig } from 'src/configs/api-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import type { BridgeBasicData, BridgeInspection } from 'src/types/project/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface BridgeInspectionFormProps {
    formik: FormikProps<BridgeInspection>;
    file: File | null;
    onFileChange: (file: File | null) => void;
}

const BridgeInspectionForm: React.FC<BridgeInspectionFormProps> = ({ formik, file, onFileChange }) => {
    const { t: transl } = useTranslation();

    const { data: bridgePartDefects } = useQuery({
        queryKey: ['bridge-part-defects'],
        queryFn: () =>
            projectGeneralMasterDataApiService.getAll({
                filter: { model: projectMasterModels.bridgePartDefect.model }
            })
    });

    const { data: damageTypes } = useQuery({
        queryKey: ['damage-types'],
        queryFn: () =>
            projectGeneralMasterDataApiService.getAll({
                filter: { model: projectMasterModels.damageType.model }
            })
    });

    const { data: damageConditions } = useQuery({
        queryKey: ['damage-conditions'],
        queryFn: () =>
            projectGeneralMasterDataApiService.getAll({
                filter: { model: projectMasterModels.damageCondition.model }
            })
    });

    const { data: hydrologyDefects } = useQuery({
        queryKey: ['hydrology-defects'],
        queryFn: () =>
            projectGeneralMasterDataApiService.getAll({
                filter: { model: projectMasterModels.hydrologyDefect.model }
            })
    });

    const { data: bridges } = useQuery({
        queryKey: ['bridges', formik.values.project_id],
        queryFn: () =>
            projectOtherApiService<BridgeBasicData>().getAll('bridge-basic-data', dropDownConfig({
                filter: {
                    project_id: formik.values.project_id
                }
            }))
    });

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomSelect
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.bridge-name')}
                    placeholder={transl('project.other.bridge-inspection.details.bridge-name')}
                    name="bridge_id"
                    size="small"
                    sx={{ mb: 2 }}
                    options={
                        bridges?.payload.map((bridge) => ({
                            label: bridge.name,
                            value: bridge.id
                        })) || []
                    }
                />

                <CustomSelect
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.bridge-part-defect-id')}
                    placeholder={transl('project.other.bridge-inspection.details.bridge-part-defect-id')}
                    name="bridge_part_defect_id"
                    size="small"
                    sx={{ mb: 2 }}
                    options={
                        bridgePartDefects?.payload.map((defect) => ({
                            label: defect.title,
                            value: defect.id
                        })) || []
                    }
                />

                <CustomSelect
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.damage-type-id')}
                    placeholder={transl('project.other.bridge-inspection.details.damage-type-id')}
                    name="damage_type_id"
                    size="small"
                    sx={{ mb: 2 }}
                    options={
                        damageTypes?.payload.map((type) => ({
                            label: type.title,
                            value: type.id
                        })) || []
                    }
                />

                <CustomSelect
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.damage-condition-id')}
                    placeholder={transl('project.other.bridge-inspection.details.damage-condition-id')}
                    name="damage_condition_id"
                    size="small"
                    sx={{ mb: 2 }}
                    options={
                        damageConditions?.payload.map((condition) => ({
                            label: condition.title,
                            value: condition.id
                        })) || []
                    }
                />

                <CustomSelect
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.hydrology-defect-id')}
                    placeholder={transl('project.other.bridge-inspection.details.hydrology-defect-id')}
                    name="hydrology_defect_id"
                    size="small"
                    sx={{ mb: 2 }}
                    options={
                        hydrologyDefects?.payload.map((defect) => ({
                            label: defect.title,
                            value: defect.id
                        })) || []
                    }
                />

                <CustomTextBox
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.maintenance-action')}
                    placeholder={transl('project.other.bridge-inspection.details.maintenance-action')}
                    name="maintenance_action"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                <CustomTextBox
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.bridge-history')}
                    placeholder={transl('project.other.bridge-inspection.details.bridge-history')}
                    name="bridge_history"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />

                <CustomTextBox
                    fullWidth
                    label={transl('project.other.bridge-inspection.details.inspector-remark')}
                    placeholder={transl('project.other.bridge-inspection.details.inspector-remark')}
                    name="inspector_remark"
                    size="small"
                    multiline
                    rows={3}
                    sx={{ mb: 2 }}
                />
            </Grid>

            <Grid item xs={12}>
                <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
            </Grid>
        </Grid>
    );
};

export default BridgeInspectionForm;
