import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Formik, FormikProps } from "formik";
import React from "react";
import Translations from "src/layouts/components/Translations";
import Icon from "src/@core/components/icon";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";

interface FilterListProps {
  open: boolean;
  toggle: () => void;
  handleFilter: (filters: any) => void; // Function to fetch data based on filters
  FilterComponentItems: React.ComponentType<{ formik: FormikProps<any> }>; // Correct prop type definition
  initialValues: any;
  variant?: "drawer" | "inline";
  title?: string;
}

const FilterList: React.FC<FilterListProps> = ({
  open,
  toggle,
  handleFilter,
  FilterComponentItems,
  initialValues = {},
  variant = "drawer",
  title = "Filter"
}) => {
  const handleClose = () => {
    toggle();
  };

  const filterItemsWrapperSx =
    variant === "inline"
      ? {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          columnGap: 4,
          rowGap: 2,
          "& > .MuiBox-root": {
            flex: "1 1 260px",
            marginBottom: "0 !important"
          },
          "& .MuiGrid-container": {
            flexWrap: "wrap",
            alignItems: "flex-end"
          },
          "& .MuiGrid-item": {
            flex: "1 1 260px",
            maxWidth: "unset"
          }
        }
      : undefined;

  const handleApplyFilter = async (values: any, { setStatus }: any) => {
    handleFilter(values);
    setStatus({ success: true });
  };

  const content = (
    <>
      {FilterComponentItems && (
        <Formik initialValues={initialValues} onSubmit={handleApplyFilter}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={filterItemsWrapperSx}>
                    <FilterComponentItems formik={formik} />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ mt: 5 }}>
                  <LoadingButton
                    loading={formik.isSubmitting}
                    loadingPosition="center"
                    disabled={formik.isSubmitting || !formik.isValid}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    <span>
                      <Translations text={"Search"} />
                    </span>
                  </LoadingButton>
                  <Button
                    onClick={() => {
                      formik.resetForm({});
                    }}
                    sx={{ ml: 2 }}
                    type="reset"
                    variant="contained"
                    color="secondary"
                  >
                    <Translations text={"cancel"} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      )}
    </>
  );

  if (variant === "inline") {
    if (!open) return null;

    return (
      <Box sx={{ px: 6, pb: 4 }}>
        <Box sx={{ p: 4, border: 1, borderColor: "divider", borderRadius: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h6">
              <Translations text={title} />
            </Typography>
            <IconButton onClick={handleClose}>
              <Icon icon="tabler:x" fontSize={20} />
            </IconButton>
          </Box>
          {content}
        </Box>
      </Box>
    );
  }

  return (
    <CustomSideDrawer title={title} handleClose={handleClose} open={open}>
      {() => content}
    </CustomSideDrawer>
  );
};

export default FilterList;
