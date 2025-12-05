// DocumentFilterItems.tsx
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";
import { dropDownConfig } from "src/configs/api-constants";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { Document } from "src/types/document";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface DocumentFilterItemsProps {
    formik: FormikProps<Document>;
}

const DocumentFilterItems: React.FC<DocumentFilterItemsProps> = ({ formik }) => {
    // const {typeId}=
    const route = useRouter()
    const { typeId } = route.query;
    const { data: documentCategories } = useQuery({
        queryKey: ['masterCategory', 'document'],
        queryFn: () =>
            masterCategoryApiService.getAll('document', {
                filter: {
                    documenttype_id: typeId
                }
            })
    });
    const { data: documentSubCategories, refetch: refetchSubCategories } = useQuery({
        queryKey: ['masterSubCategory', 'document'],
        queryFn: () =>
            masterSubCategoryApiService.getAll('document', {
                filter: {
                    documentcategory_id: formik.values.documentcategory_id
                }
            }),
        enabled: !!formik.values.documentcategory_id // Only fetch subcategories when a category is selected
    });

    const { t: transl } = useTranslation();

    return (
        <>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="documentcategory_id"
                    label={transl('document.form.documentcategory_id')}
                    options={
                        documentCategories?.payload?.map((documentCategory) => ({
                            value: documentCategory.id,
                            label: documentCategory.title
                        })) || []
                    }
                />
            </Box>
            <Box mb={2}>
                <CustomSelect
                    size="small"
                    name="documentsubcategory_id"
                    label={transl('document.form.documentsubcategory_id')}
                    options={
                        documentSubCategories?.payload?.map((documentCategory) => ({
                            value: documentCategory.id,
                            label: documentCategory.title
                        })) || []
                    }
                />
            </Box>

            <CustomTextBox
                fullWidth
                label={transl('document.form.author')}
                placeholder={transl('document.form.author')}
                name="author"
                size="small"
                sx={{ mb: 2 }}
            />
        </>
    );
};

export default DocumentFilterItems;