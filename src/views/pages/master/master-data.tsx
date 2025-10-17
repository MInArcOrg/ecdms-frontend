// components/MasterDataDetail.tsx
import { Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { gridSpacing } from 'src/configs/app-constants';
import Translations from 'src/layouts/components/Translations';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterCategory, MasterType } from 'src/types/master/master-types';
import MasterCategoryList from 'src/views/pages/master/master-category-type/master-category-list';
import MasterTypeList from 'src/views/pages/master/master-type/master-type-list';
import MasterSubCategoryList from './master-subcategory-type/master-sub-category-list';

interface MasterDataDetailProps {
  model: string;
}

const MasterDataDetail: React.FC<MasterDataDetailProps> = ({ model }) => {
  const router = useRouter();
  const { typeId, categoryId } = router.query;

  const { data: selectedType } = useQuery({
    queryKey: ['masterdata-type', model, typeId],
    queryFn: () =>
      masterTypeApiService.getOne(model, typeId ? String(typeId) : '', {}).then((response) => {
        return response.payload;
      }),
    enabled: !!typeId
  });

  const { data: selectedCategory } = useQuery({
    queryKey: ['masterdata-category', model, typeId, categoryId],
    queryFn: () =>
      masterCategoryApiService.getOne(model, categoryId ? String(categoryId) : '', {}).then((response) => {
        return response.payload;
      }),
    enabled: !!categoryId && !!typeId
  });

  const handleSelectType = (type: string) => {
    router.push(`/master-data/${model}/${type}`);
  };

  const handleSelectCategory = (categoryId: string) => {
    router.push(`/master-data/${model}/${selectedType?.id}/${categoryId}`);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        <Translations text={`master-data.${model}`} /> <Translations text={'master-data.master-data'} />
      </Typography>

      <Grid container spacing={gridSpacing}>
        {/* Type navigation */}
        <Grid item xs={12}>
          <MasterTypeList model={model} selectedType={selectedType as MasterType} onTypeSelect={handleSelectType} />
        </Grid>

        <Grid container item spacing={gridSpacing}>
          {/* Category list */}
          <Grid item xs={12} md={6} lg={3}>
            {selectedType ? (
              <MasterCategoryList
                model={model}
                selectedType={selectedType}
                onCategorySelect={handleSelectCategory}
                selectedCategory={selectedCategory}
              />
            ) : (
              <Typography>Select a type to see categories</Typography>
            )}
          </Grid>

          {/* Details and subcategories */}
          <Grid item xs={12} md={6} lg={9}>
            <Grid container spacing={gridSpacing}>
              {/* Subcategory list */}
              <Grid item xs={12}>
                {selectedCategory ? (
                  <MasterSubCategoryList model={model} selectedCategory={selectedCategory as MasterCategory} />
                ) : (
                  <Typography>Select a category to see subcategories</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MasterDataDetail;
