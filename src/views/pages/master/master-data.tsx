// components/MasterDataDetail.tsx
import React from 'react';
import { Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { MasterCategory, MasterType } from 'src/types/master/master-types';
import MasterTypeList from 'src/views/pages/master/master-type/master-type-list';
import MasterCategoryList from 'src/views/pages/master/master-category-type/master-category-list';
import MasterTypeDetailCard from './master-type/master-type-detail-card';
import { gridSpacing } from 'src/configs/app-constants';
import Translations from 'src/layouts/components/Translations';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { useQuery } from '@tanstack/react-query';

interface MasterDataDetailProps {
  model: string;
}

const MasterDataDetail: React.FC<MasterDataDetailProps> = ({ model }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data: selectedType, refetch } = useQuery({
    queryKey: ['type', model, id],
    queryFn: () =>
      masterTypeApiService.getOne(model, id ? String(id) : '', {}).then((response) => {
        return response.payload;
      })
  });

  const theme = useTheme();

  const handleSelectType = (type: string) => {
    router.push(`/master-data/${model}/${type}`);
  };

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
              <MasterTypeDetailCard masterType={selectedType} isLoading={false} model={model} refetch={refetch} />
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
