// components/MasterDataDetail.tsx
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { MasterCategory, MasterType } from 'src/types/master/master-types';
import MasterTypeList from 'src/views/pages/master/master-type/master-type-list';
import MasterCategoryList from 'src/views/pages/master/master-category-type/master-category-type-list';
import MasterTypeDetailCard from './master-type/master-type-detail-card';
import { gridSpacing } from 'src/configs/app-constants';
import Translations from 'src/layouts/components/Translations';

const types: MasterType[] = [
  { id: '1', name: 'Type1', description: 'some description' },
  { id: '2', name: 'Type2', description: 'some description' },
  { id: '3', name: 'Type3', description: 'some description' }
];

const categoriesData: Record<string, MasterCategory[]> = {
  '1': [
    { id: '1', name: 'Category1', description: 'Description1' },
    { id: '2', name: 'Category2', description: 'Description2' }
  ],
  '2': [
    { id: '3', name: 'Category3', description: 'Description3' },
    { id: '4', name: 'Category4', description: 'Description4' }
  ],
  '3': [
    { id: '5', name: 'Category5', description: 'Description5' },
    { id: '6', name: 'Category6', description: 'Description6' }
  ]
};
interface MasterDataDetailProps {
  model: string;
}
const MasterDataDetail: React.FC<MasterDataDetailProps> = ({ model }) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedType, setSelectedType] = useState<MasterType>();

  useEffect(() => {
    setSelectedType(types.find((type) => type.id === String(id)) || ({} as MasterType));
  }, [id]);

  const handleSelectType = (type: string) => {
    router.push(`/master-data/stakeholder/${type}`);
  };

  return (
    <Container>
      <Typography variant="inherit" gutterBottom>
        <Translations text={`master-data.${model}`} /> <Translations text={'master-data.master-data'} />
      </Typography>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={3}>
          <MasterTypeList types={types} selectedType={selectedType as MasterType} onTypeSelect={handleSelectType} />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <MasterTypeDetailCard masterType={selectedType} isLoading={false} />
            </Grid>
            <Grid item xs={12}>
              {selectedType ? (
                <MasterCategoryList categories={categoriesData[selectedType.id]} />
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
