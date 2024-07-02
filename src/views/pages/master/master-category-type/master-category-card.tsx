// components/MasterCategoryList.tsx
import { Box, CardActions, CardContent, Collapse, Grid, IconButton, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import Icon from 'src/@core/components/icon';
import { MasterCategory } from 'src/types/master/master-types';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import MasterSubCategoryList from '../master-subcategory-type/master-sub-category-list';
import FileDrawer from 'src/views/components/custom/files-drawer';

const MasterCategoryCard = ({
  masterCategory,
  model,
  onEdit,
  onDelete,
  refetch
}: {
  masterCategory: MasterCategory;
  model: string;
  onEdit: (category: MasterCategory) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Fragment>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box mr={2}>
                <IconButton onClick={handleExpandClick}>
                  {expanded ? <Icon icon="tabler:chevron-up" fontSize={20} /> : <Icon icon="tabler:chevron-down" fontSize={20} />}
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h5" component="div">
                  {masterCategory.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {masterCategory.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <FileDrawer id={masterCategory.id} type={`${model.toLocaleUpperCase().replace(/-/g, '_')}`} /> &nbsp;
                <ModelActionComponent
                  model="Position"
                  model_id={masterCategory.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions onEdit={onEdit} onDelete={() => onDelete(masterCategory.id)} item={masterCategory} options={[]} />
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <MasterSubCategoryList model={model} selectedCategory={masterCategory} />
      </Collapse>
    </Fragment>
  );
};
export default MasterCategoryCard;
