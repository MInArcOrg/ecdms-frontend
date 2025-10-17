// components/MasterSubCategoryList.tsx
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { MasterSubCategory } from 'src/types/master/master-types';
import { capitalizeFirstLetter } from 'src/utils/string';

const MasterSubCategoryCard = ({
  masterSubCategory,
  onEdit,
  onDelete,
  refetch,
  model
}: {
  masterSubCategory: MasterSubCategory;
  onEdit: (masterSubCategory: MasterSubCategory) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
  model: string;
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography
                  noWrap
                  component={Button}
                  sx={{
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' }
                  }}
                >
                  {masterSubCategory.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {masterSubCategory.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <CardActions style={{ justifyContent: 'flex-end' }}>
              <Fragment>
                <Box>
                  <FileDrawer id={masterSubCategory.id} type={`${model.toLocaleUpperCase()}_SUB_CATEGORY`} /> &nbsp;
                  <Box sx={{ display: 'flex' }}>
                    <ModelActionComponent
                      model={`${capitalizeFirstLetter(model)}type`}
                      model_id={masterSubCategory.id}
                      refetchModel={refetch}
                      resubmit={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                      title={''}
                      postAction={function (): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                    <RowOptions onEdit={onEdit} onDelete={() => onDelete(masterSubCategory.id)} item={masterSubCategory} options={[]} />
                  </Box>
                </Box>
              </Fragment>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default MasterSubCategoryCard;
