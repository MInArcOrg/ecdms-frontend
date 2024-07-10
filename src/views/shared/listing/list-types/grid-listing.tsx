import { Box, Grid, GridProps } from '@mui/material';
import { gridSpacing } from 'src/configs/app-constants';

interface GridListingProps<T> {
  items: T[];
  ItemViewComponent: React.ComponentType<{ data: T }>;
  spacing?: GridProps['spacing'];
  margin?: string | number;
  breakpoints?: {
    xs?: GridProps['xs'];
    sm?: GridProps['sm'];
    md?: GridProps['md'];
    lg?: GridProps['lg'];
    xl?: GridProps['xl'];
  };
}

const GridListing = <T extends {}>({
  items,
  ItemViewComponent,
  spacing = gridSpacing,
  margin = 3,
  breakpoints = { xs: 12, sm: 6, lg: 4, xl: 3 }
}: GridListingProps<T>) => {
  return (
    <Box sx={{ m: margin }}>
      <Grid container direction="row" spacing={spacing}>
        {items?.map((item, index) => (
          <Grid
            key={index}
            item
            xs={breakpoints.xs}
            sm={breakpoints.sm}
            md={breakpoints.md}
            lg={breakpoints.lg}
            xl={breakpoints.xl}
            alignItems="stretch"
          >
            <ItemViewComponent data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridListing;
