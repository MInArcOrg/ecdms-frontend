// components/MasterDataDetail.tsx
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';
import { gridSpacing } from 'src/configs/app-constants';
import Translations from 'src/layouts/components/Translations';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterType } from 'src/types/master/master-types';
import MasterCategoryList from 'src/views/pages/master/master-category-type/master-category-list';
import MasterTypeList from 'src/views/pages/master/master-type/master-type-list';
import MasterTypeDetailCard from './master-type/master-type-detail-card';

interface MasterDataDetailProps {
  model: string;
}

const MasterDataDetail: React.FC<MasterDataDetailProps> = ({ model }) => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: selectedType,
    refetch,
    error,
    isLoading
  } = useQuery({
    queryKey: ['masterdata-type', model, id],
    queryFn: () =>
      masterTypeApiService.getOne(model, id ? String(id) : '', {}).then((response) => {
        return response.payload;
      }),
    enabled: !!id
  });

  const handleSelectType = (type: string) => {
    router.push(`/master-data/${model}/${type}`);
  };
  console.log('selectedType selectedType', selectedType);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        <Translations text={`master-data.${model}`} /> <Translations text={'master-data.master-data'} />
      </Typography>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={4} md={3}>
          <MasterTypeList model={model} selectedType={selectedType as MasterType} onTypeSelect={handleSelectType} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              {isLoading ? (
                <CircularProgress />
              ) : error ? (
                <Typography>Error loading master type data.</Typography>
              ) : (
                <MasterTypeDetailCard masterType={selectedType as MasterType} isLoading={false} model={model} refetch={refetch} />
              )}
            </Grid>
            <Grid item xs={12}>
              {selectedType ? (
                <MasterCategoryList model={model} selectedType={selectedType} />
              ) : (
                <Typography>Select a type to see categories</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MasterDataDetail;
