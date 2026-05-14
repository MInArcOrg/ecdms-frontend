// StakeholderFilterItems.tsx
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { isArray } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import generalMasterDataApiService from "src/services/general/general-master-data-service";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Stakeholder } from "src/types/stakeholder";
import CustomSelect from "src/views/shared/form/custom-select";

interface StakeholderFilterItemsProps {
    formik: FormikProps<Stakeholder>;
}

const StakeholderFilterItems: React.FC<StakeholderFilterItemsProps> = ({ formik }) => {
    // const {typeId}=
    const route = useRouter()
    const { typeId } = route.query;
    const [value, setValue] = useState<string>("1");

    const { data: stakeholderStatus } = useQuery({
        queryKey: ['general-master', 'stakeholder-progress-statuses'],
        queryFn: () => generalMasterDataApiService.getAll('stakeholder-progress-statuses', {})
    });
    const { data: stakeholderCategories } = useQuery({
        queryKey: ['masterCategory', 'stakeholder', typeId],
        queryFn: () =>
            masterCategoryApiService.getAll('stakeholder', {
                filter: {
                    stakeholdertype_id: typeId
                }
            })
    });

    const { data: stakeholderSubCategories, refetch: refetchSubCategories } = useQuery({
        queryKey: ['masterSubCategory', 'stakeholder', formik.values.stakeholdercategory_id],
        queryFn: () =>
            masterSubCategoryApiService.getAll('stakeholder', {
                filter: {
                    stakeholdercategory_id: formik.values.stakeholdercategory_id
                }
            }),
        enabled: !!formik.values.stakeholdercategory_id // Only fetch subcategories when a category is selected
    });

    const { t: transl } = useTranslation();
    const { data: ownershipTypes } = useQuery({
        queryKey: ["ownershipTypes"],
        queryFn: () => generalMasterDataApiService.getAll("ownerships", {}),
    });

    const { data: businessfields } = useQuery({
        queryKey: ["businessfields"],
        queryFn: () => generalMasterDataApiService.getAll("business-fields", {}),
    });
    return (
        <>
            <Box mb={2}>

                <CustomSelect
                    size="small"
                    name="stakeholdercategory_id"
                    label={transl('stakeholder.form.category')}
                    options={
                        stakeholderCategories?.payload?.map((stakeholderCategory) => ({
                            value: stakeholderCategory.id,
                            label: stakeholderCategory.title
                        })) || []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="stakeholdersubcategory_id"
                    label={transl('stakeholder.form.sub-category')}
                    options={
                        isArray(stakeholderSubCategories?.payload)
                            ? stakeholderSubCategories?.payload?.map((stakeholderSubCategory) => ({
                                value: stakeholderSubCategory.id,
                                label: stakeholderSubCategory.title
                            }))
                            : []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="status_id"
                    label={transl('stakeholder.form.status')}
                    options={
                        isArray(stakeholderStatus?.payload)
                            ? stakeholderStatus?.payload?.map((stakeholderSubCategory) => ({
                                value: stakeholderSubCategory.id,
                                label: stakeholderSubCategory.title
                            }))
                            : []
                    }
                />
            </Box>

            <Box mb={2}>
                <CustomSelect
                    name="businessfield_id"
                    label={transl("stakeholder.form.businessfield")}
                    options={
                        businessfields?.payload?.map((businessfield) => ({
                            value: businessfield.id,
                            label: businessfield.title,
                        })) || []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    name="ownership_id"
                    label={transl("stakeholder.form.ownership")}
                    options={
                        ownershipTypes?.payload?.map((ownership) => ({
                            value: ownership.id,
                            label: ownership.title,
                        })) || []
                    }
                />
            </Box>
        </>
    );
};

export default StakeholderFilterItems;