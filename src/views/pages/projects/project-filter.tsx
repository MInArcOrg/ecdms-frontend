// ProjectFilterItems.tsx
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { isArray } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import generalMasterDataApiService from "src/services/general/general-master-data-service";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Project } from "src/types/project";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface ProjectFilterItemsProps {
    formik: FormikProps<Project>;
}

const ProjectFilterItems: React.FC<ProjectFilterItemsProps> = ({ formik }) => {
    // const {typeId}=
    const route = useRouter()
    const { typeId } = route.query;
    const [value, setValue] = useState<string>("1");

      const { data: projectStatus } = useQuery({
        queryKey: ["projectTypes", projectMasterModels.projectStatus.model],
        queryFn: () => projectGeneralMasterDataApiService.getAll(dropDownConfig({
          filter: {
            model: projectMasterModels.projectStatus.model,
          }
        })),
      });
    const { data: projectCategories } = useQuery({
        queryKey: ['masterCategory', 'project', typeId],
        queryFn: () =>
            masterCategoryApiService.getAll('project', {
                filter: {
                    projecttype_id: typeId
                }
            })
    });

    const { data: projectSubCategories, refetch: refetchSubCategories } = useQuery({
        queryKey: ['masterSubCategory', 'project', formik.values.projectcategory_id],
        queryFn: () =>
            masterSubCategoryApiService.getAll('project', {
                filter: {
                    projectcategory_id: formik.values.projectcategory_id
                }
            }),
        enabled: !!formik.values.projectcategory_id // Only fetch subcategories when a category is selected
    });

    const { t: transl } = useTranslation();

    return (
        <>
            <Box mb={2}>

                <CustomSelect
                    size="small"
                    name="projectcategory_id"
                    label={transl('project.form.category')}
                    options={
                        projectCategories?.payload?.map((projectCategory) => ({
                            value: projectCategory.id,
                            label: projectCategory.title
                        })) || []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="projectsubcategory_id"
                    label={transl('project.form.sub-category')}
                    options={
                        isArray(projectSubCategories?.payload)
                            ? projectSubCategories?.payload?.map((projectSubCategory) => ({
                                value: projectSubCategory.id,
                                label: projectSubCategory.title
                            }))
                            : []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomTextBox
                    fullWidth
                    label={transl('project.form.grade')}
                    placeholder={transl('project.form.grade')}
                    name="grade"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="status_id"
                    label={transl('project.form.status')}
                    options={
                        isArray(projectStatus?.payload)
                            ? projectStatus?.payload?.map((projectSubCategory) => ({
                                value: projectSubCategory.id,
                                label: projectSubCategory.title
                            }))
                            : []
                    }
                />
            </Box></>
    );
};

export default ProjectFilterItems;