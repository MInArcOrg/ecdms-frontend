import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import resourceApiService from 'src/services/resource/resource-service';
import { MasterType, MasterSubCategory, MasterCategory } from 'src/types/master/master-types';
import { ProjectResource } from 'src/types/project/project-resource';
import { GetRequestParam, IApiResponse, IApiPayload } from 'src/types/requests';
import CustomSelect from 'src/views/shared/form/custom-select';

interface ProjectResourceFormProps {
  formik: FormikProps<ProjectResource>;
  isLocaleEdit?: boolean;
  typeId: string;
}

const ProjectResourceForm: React.FC<ProjectResourceFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();

  const fetchOptions = (apiService: { getAll: any; getOne?: ((model: string, idx: string, params: GetRequestParam) => Promise<IApiResponse<MasterType>>) | ((model: string, idx: string, params: GetRequestParam) => Promise<IApiResponse<any>>) | ((model: string, idx: string, params: GetRequestParam) => Promise<IApiResponse<MasterSubCategory>>); delete?: ((model: string, idx: string) => Promise<IApiResponse<any>>) | ((model: string, idx: string) => Promise<IApiResponse<any>>) | ((model: string, idx: string) => Promise<IApiResponse<any>>); create?: ((model: string, body: IApiPayload<MasterType>) => Promise<IApiResponse<MasterType>>) | ((model: string, body: IApiPayload<MasterCategory>) => Promise<IApiResponse<MasterCategory>>) | ((model: string, body: { data: MasterSubCategory; files: any[]; }) => Promise<IApiResponse<MasterSubCategory>>); update?: ((model: string, id: string, body: IApiPayload<MasterType>) => Promise<IApiResponse<MasterType>>) | ((model: string, id: string, body: IApiPayload<MasterCategory>) => Promise<IApiResponse<MasterCategory>>) | ((model: string, id: string, body: { data: MasterSubCategory; files: any[]; }) => Promise<IApiResponse<MasterSubCategory>>); getOnee?: (model: string, idx: string, params: GetRequestParam) => Promise<IApiResponse<any>>; }, filter: { resourcetype_id?: string; resourcecategory_id?: string; }) => () => 
    apiService.getAll('resource', { filter });

  const { data: resourceTypes } = useQuery({
    queryKey: ['masterType', 'resource'],
    queryFn: fetchOptions(masterTypeApiService, { resourcetype_id: formik.values.resourcetype_id }),
  });

  const { data: resourceCategories, refetch: refetchResourceCategories } = useQuery({
    queryKey: ['masterCategory', 'resource'],
    queryFn: fetchOptions(masterCategoryApiService, { resourcetype_id: formik.values.resourcetype_id }),
    enabled: !!formik.values.resourcetype_id,
  });

  const { data: resourceSubCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'resource'],
    queryFn: fetchOptions(masterSubCategoryApiService, { resourcecategory_id: formik.values.resourcecategory_id }),
    enabled: !!formik.values.resourcecategory_id,
  });

  useEffect(() => {
    if (formik.values.resourcecategory_id) refetchSubCategories();
  }, [formik.values.resourcecategory_id, refetchSubCategories]);

  useEffect(() => {
    if (formik.values.resourcetype_id) refetchResourceCategories();
  }, [formik.values.resourcetype_id, refetchResourceCategories]);

  const renderSelectBox = (name: string, label: string, optionsData: { payload: { id: any; title: any; }[]; }) => (
    <Box mb={2}>
      <CustomSelect
        size="small"
        name={name}
        label={label}
        options={
          optionsData?.payload?.map((item) => ({
            value: item.id,
            label: item.title,
          })) || []
        }
      />
    </Box>
  );

  return (
    <>
      {renderSelectBox('resourcetype_id', transl('resource.form.type'), resourceTypes)}
      {renderSelectBox('resourcecategory_id', transl('resource.form.category'), resourceCategories)}
      {renderSelectBox('resourcesubcategory_id', transl('resource.form.sub-category'), resourceSubCategories)}
    </>
  );
};

export default ProjectResourceForm;
