import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { indexOf } from "lodash";
import ResourceAnalyticsLayout from "src/views/analytics/layouts/ResourceAnalyticsLayout";
import { getResourceTypes } from "src/services/master/resources";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "src/store/master/resources";
import { getResources } from "src/services/resources";
import { getSubdepartments } from "src/services/department/department-service";
import { getLoggedInUser } from "src/helpers/token_helper";
import ResourceFilter from "src/views/analytics/layouts/ResourceAnalyticsLayout/ResourceFilter";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import TableView from "src/views/analytics/layouts/ResourceAnalyticsLayout/TableView";
import ChartView from "src/views/analytics/layouts/ResourceAnalyticsLayout/ChartView";
import Typography from "@mui/material/Typography";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import "chart.js/auto";

const years = [
  { id: 0, name: "2021" },
  { id: 1, name: "2022" },
  { id: 2, name: "2023" },
  { id: 3, name: "2024" },
  { id: 4, name: "2025" },
  { id: 5, name: "2026" },
  { id: 6, name: "2027" },
  { id: 7, name: "2028" },
  { id: 8, name: "2029" },
  { id: 9, name: "2030" },
];

const ResourceAnalytics = () => {
  const dispatch = useDispatch();
  const masterStore = useSelector((state) => state.masterResources);
  const [baseYear, setBaseYear] = useState(years[0]);
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategoryOptions, setSubcategoryOptions] = useState([]);
  const [item, setItem] = useState(null);
  const [tableView, setTableView] = useState(true);
  const [rows, setRows] = useState([]);

  const [{ data: resources, loading, error }, resourcesGet] = getResources();

  const [{ data: labels }] = getSubdepartments(getLoggedInUser().department_id);

  const [
    {
      data: resourceTypes,
      loading: resourceTypesLoading,
      error: resourceTypesError,
    },
    getTypes,
  ] = getResourceTypes();

  const getData = (typeId) => {
    resourcesGet({
      params: {
        typeId: typeId || type.id,
        categoryId: category?.id,
        subcategoryId: subCategory?.id,
        page: -1,
      },
    });
  };

  function createData(label, rest) {
    const baseIndex = indexOf(years, baseYear);

    const data = rest.map((item, index) =>
      Number((item / rest[baseIndex]) * 100).toFixed(0)
    );

    return { label, ...data };
  }

  useEffect(() => {
    if (labels?.length > 0) {
      setRows(
        labels.map((reagion) => {
          return createData(
            reagion.name,
            [100, 120, 140, 150, 155, 160, 170, 175, 180, 180]
          );
        })
      );
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labels, baseYear]);

  useEffect(() => {
    if (type) {
      dispatch(getCategories(type.id));
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (!category) {
      setSubCategory(null);
      setSubcategoryOptions([]);
    }
    type && getData();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    type && category && getData();

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategory]);

  return (
    <ResourceAnalyticsLayout>
      <ResourceFilter
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        item={item}
        setItem={setItem}
        resourceTypes={resourceTypes}
        subCategoryOptions={subCategoryOptions}
        setSubcategoryOptions={setSubcategoryOptions}
        masterStore={masterStore}
        baseYear={baseYear}
        setBaseYear={setBaseYear}
        getData={getData}
        loading={loading}
        resourceTypesLoading={resourceTypesLoading}
        resources={resources}
        years={years}
      />

      <Box display="flex" gap={2} my={3} alignItems="center">
        <IconButton
          aria-label="table view"
          color={`${tableView ? "primary" : "secondary"}`}
          onClick={() => setTableView(true)}
          sx={{ display: "flex", gap: 2, borderRadius: 1 }}
        >
          <Icon icon="mdi:table" />
          <Typography component="span" variant="body1">
            Table
          </Typography>
        </IconButton>

        <IconButton
          aria-label="chart view"
          color={`${!tableView ? "primary" : "secondary"}`}
          onClick={() => setTableView(false)}
          sx={{ display: "flex", gap: 2, borderRadius: 1 }}
        >
          <Icon icon="mdi:chart-bar" />
          <Typography component="span" variant="body1">
            Graph
          </Typography>
        </IconButton>
      </Box>

      <Card>
        {tableView === true ? (
          <TableView
            years={years}
            baseYear={indexOf(years, baseYear)}
            reagions={labels ? labels : []}
            data={rows}
          />
        ) : (
          <DatePickerWrapper>
            <ChartView
              years={years}
              reagions={labels ? labels : []}
              baseYear={indexOf(years, baseYear)}
            />
          </DatePickerWrapper>
        )}
      </Card>
    </ResourceAnalyticsLayout>
  );
};

export default ResourceAnalytics;
