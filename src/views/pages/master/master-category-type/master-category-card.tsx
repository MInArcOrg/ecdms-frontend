// components/MasterCategoryList.tsx
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import { Fragment, useState } from 'react';
import Icon from 'src/@core/components/icon';
import { MasterCategory } from 'src/types/master/master-types';
import MasterCategoryDetailDrawer from './master-category-detail-drawer';

const MasterCategoryCard = ({
  masterCategory,
  model,
  onEdit,
  onDelete,
  refetch,
  onCategorySelect,
  selectedCategory
}: {
  masterCategory: MasterCategory;
  model: string;
  onEdit: (category: MasterCategory) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
  onCategorySelect: (id: string) => void;
  selectedCategory: MasterCategory | null;
}) => {
  const [showDetailDrawer, setShowDetailDrawer] = useState<boolean>(false);
  const toggleDrawer = () => {
    setShowDetailDrawer(!showDetailDrawer);
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <ListItemButton
          sx={{
            borderRadius: '0.5rem',
            flex: 1
          }}
          selected={masterCategory.id === selectedCategory?.id}
          onClick={() => onCategorySelect(masterCategory.id)}
        >
          <ListItemText
            primaryTypographyProps={{
              style: {
                color: `${masterCategory?.id === selectedCategory?.id ? '#fff' : ''}`,
                wordWrap: 'break-word',
                maxWidth: '95%'
              }
            }}
            primary={masterCategory.title}
          />
        </ListItemButton>

        <IconButton onClick={toggleDrawer}>
          <Icon icon="tabler:info-circle" fontSize={20} />
        </IconButton>
        <MasterCategoryDetailDrawer
          handleClose={toggleDrawer}
          masterCategory={masterCategory}
          model={model}
          open={showDetailDrawer}
          refetch={refetch}
        />
      </Box>
    </Fragment>
  );
};
export default MasterCategoryCard;
