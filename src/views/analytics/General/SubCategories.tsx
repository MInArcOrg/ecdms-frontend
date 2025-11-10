// ** React Imports
import { useState } from 'react';

// ** MUI Imports
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ** Third-Party Imports
import { useQuery } from '@tanstack/react-query';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';

// ** Custom Imports
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { MasterCategory, MasterSubCategory, MasterType } from 'src/types/master/master-types';

const PerfectScrollbar = styled(PerfectScrollbarComponent)(() => ({
  maxHeight: '30rem',
}));

const ScrollWrapper = ({
  children,
  hidden,
}: {
  children: React.ReactNode;
  hidden?: boolean;
}) => {
  if (hidden) {
    return (
      <Box sx={{ maxHeight: '30rem', overflowY: 'auto', overflowX: 'hidden' }}>
        {children}
      </Box>
    );
  }
  return (
    <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>
      {children}
    </PerfectScrollbar>
  );
};

interface GeneralSubCategoriesProps {
  selectedType: MasterType;
  model: string;
  onSelectCategory?: (category: MasterCategory) => void;
  onSelectSubCategory?: (subcategory: MasterSubCategory) => void;
}

const GeneralSubCategories = ({
  selectedType,
  model,
  onSelectCategory,
  onSelectSubCategory,
}: GeneralSubCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<MasterCategory | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  // 🔹 Fetch Categories based on MasterType
  const { data: categories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['masterCategories', selectedType?.id],
    queryFn: () => masterCategoryApiService.getAll(model, { filter: { [`${model}type_id`]: selectedType?.id } }),
    enabled: !!selectedType?.id,
  });

  // 🔹 Fetch Subcategories based on selectedCategory
  const { data: subcategories, isLoading: isSubLoading } = useQuery({
    queryKey: ['masterSubcategories', selectedCategory?.id],
    queryFn: () =>
      masterSubCategoryApiService.getAll(model, { filter: { [`${model}category_id`]: selectedCategory?.id } }),
    enabled: !!selectedCategory?.id,
  });

  const categoryList = categories?.payload || [];
  const subcategoryList = subcategories?.payload || [];

  // 🔹 Handle Category Selection
  const handleCategorySelect = (categoryId: string) => {
    const category = categoryList.find((c: MasterCategory) => c.id === categoryId) || null;
    setSelectedCategory(category);
    setSelectedSub(null);
    if (onSelectCategory) onSelectCategory(category);
  };

  // 🔹 Handle Subcategory Selection
  const handleSubCategorySelect = (sub: any) => {
    setSelectedSub(sub.title);
    if (onSelectSubCategory) onSelectSubCategory(sub);
  };

  return (
    <Card>
      <CardHeader
        title="Sub Categories"
        subheader={`Counter April ${new Date().getFullYear()}`}
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
        action={
          <TextField
            select
            fullWidth
            size="small"
            label="Select Category"
            value={selectedCategory?.id || ''}
            onChange={(e) => handleCategorySelect(e.target.value)}
            sx={{ mb: 3 }}
            disabled={isCategoryLoading}
          >
            {categoryList.map((category: MasterCategory) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        }
      />

      <CardContent>
        {/* 🔹 Subcategory List */}
        {isSubLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ScrollWrapper>
            {subcategoryList.length === 0 && selectedCategory ? (
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}
              >
                No subcategories found.
              </Typography>
            ) : (
              subcategoryList.map((item: any) => (
                <ListItem
                  key={item.id}
                  sx={{ padding: 0 }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircularProgress
                        size={28}
                        thickness={5}
                        value={item.progress || 70}
                        variant="determinate"
                        color="primary"
                      />
                    </Box>
                  }
                >
                  <ListItemButton
                    sx={{
                      borderRadius: '0.5rem',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        '&:hover': { backgroundColor: 'primary.light' },
                      },
                    }}
                    selected={item.title === selectedSub}
                    onClick={() => handleSubCategorySelect(item)}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        style: {
                          color: `${item.title === selectedSub ? '#fff' : ''}`,
                          wordWrap: 'break-word',
                          maxWidth: '95%',
                        },
                      }}
                      primary={item.title}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </ScrollWrapper>
        )}
      </CardContent>
    </Card>
  );
};

export default GeneralSubCategories;
