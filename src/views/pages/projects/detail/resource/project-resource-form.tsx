import { Box, Button, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomTextField from 'src/@core/components/mui/text-field';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import resourceApiService from 'src/services/resource/resource-service';
import { ProjectResource } from 'src/types/project/project-resource';
import { IApiResponse } from 'src/types/requests';
import { Resource } from 'src/types/resource';

interface ProjectResourceFormProps {
  onSubmit: (body: Resource) => Promise<IApiResponse<ProjectResource>>;
  addedResources?: ProjectResource[]; // Optional prop to pass the already added resources
  refetch: () => void;
}

const ProjectResourceForm: React.FC<ProjectResourceFormProps> = ({ onSubmit, addedResources = [], refetch }) => {
  const { t: transl } = useTranslation();

  const [resourceTypeId, setResourceTypeId] = useState<string>('');
  const [resourceCategoryId, setResourceCategoryId] = useState<string>('');
  const [resourceSubCategoryId, setResourceSubCategoryId] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const fetchOptions = (apiService: any, filter: any) => () => apiService.getAll('resource', { filter });

  const { data: resourceTypes } = useQuery({
    queryKey: ['masterType', 'resource'],
    queryFn: fetchOptions(masterTypeApiService, {})
  });

  const { data: resourceCategories } = useQuery({
    queryKey: ['masterCategory', 'resource'],
    queryFn: fetchOptions(masterCategoryApiService, { resourcetype_id: resourceTypeId }),
    enabled: !!resourceTypeId
  });

  const { data: resourceSubCategories } = useQuery({
    queryKey: ['masterSubCategory', 'resource'],
    queryFn: fetchOptions(masterSubCategoryApiService, { resourcecategory_id: resourceCategoryId }),
    enabled: !!resourceCategoryId
  });

  const handleResourceTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setResourceTypeId(event.target.value as string);
    setResourceCategoryId(''); // Reset category and subcategory when type changes
    setResourceSubCategoryId('');
  };

  const handleResourceCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setResourceCategoryId(event.target.value as string);
    setResourceSubCategoryId(''); // Reset subcategory when category changes
  };

  const handleResourceSubCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setResourceSubCategoryId(event.target.value as string);
  };

  const handleSearch = async () => {
    try {
      const filter = {
        resourcetype_id: resourceTypeId,
        resourcecategory_id: resourceCategoryId,
        resourcesubcategory_id: resourceSubCategoryId
      };

      const response = await resourceApiService.getAll({ filter });
      setSearchResults(response.payload || []);
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  const handleAddResource = (resource: any) => {
    onSubmit(resource)
      .then(() => {
        refetch();
      })
      .catch(() => {});
  };

  const renderSelectBox = (
    name: string,
    label: string,
    value: string,
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
    optionsData: { payload: { id: any; title: any }[] }
  ) => (
    <Box mb={2}>
      <CustomTextField fullWidth size="small" select name={name} label={label} value={value} onChange={onChange}>
        {optionsData?.payload?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </CustomTextField>
    </Box>
  );

  const renderTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{transl('resource.columns.title')}</TableCell>
          <TableCell>{transl('resource.columns.measurement-unit')}</TableCell>
          <TableCell>{transl('common.table-columns.actions')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {searchResults.map((resource) => {
          const isAdded = addedResources.some((added) => added.resource_id === resource.id);

          return (
            <TableRow key={resource.id}>
              <TableCell>{resource.title}</TableCell>
              <TableCell>{resource.measurement_unit}</TableCell>
              <TableCell>
                {!isAdded && (
                  <Button variant="contained" color="primary" onClick={() => handleAddResource(resource)}>
                    {transl('common.actions.add')}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );

  return (
    <>
      {renderSelectBox('resourcetype_id', transl('resource.form.type'), resourceTypeId, handleResourceTypeChange, resourceTypes)}
      {renderSelectBox(
        'resourcecategory_id',
        transl('resource.form.category'),
        resourceCategoryId,
        handleResourceCategoryChange,
        resourceCategories
      )}
      {renderSelectBox(
        'resourcesubcategory_id',
        transl('resource.form.sub-category'),
        resourceSubCategoryId,
        handleResourceSubCategoryChange,
        resourceSubCategories
      )}

      <Button variant="contained" color="primary" onClick={handleSearch}>
        {transl('resource.form.search')}
      </Button>

      {searchResults.length > 0 && renderTable()}
    </>
  );
};

export default ProjectResourceForm;
