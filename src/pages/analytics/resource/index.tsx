// ResourceAnalytics.tsx
import { Box, Card, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { indexOf } from "lodash";

import { useAuth } from "src/hooks/useAuth";
import departmentApiService from "src/services/department/department-service";
import masterCategoryApiService from "src/services/master-data/master-category-service";
import masterTypeApiService from "src/services/master-data/master-type-service";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import resourceApiService from "src/services/resource/resource-service";
import { defaultGetRequestParam } from "src/types/requests";
import { MasterCategory, MasterSubCategory, MasterType } from "src/types/master/master-types";

import ResourceAnalyticsLayout from "src/views/analytics/layouts/ResourceAnalyticsLayout";
import ResourceFilter from "src/views/analytics/layouts/ResourceAnalyticsLayout/ResourceFilter";
import TableView from "src/views/analytics/layouts/ResourceAnalyticsLayout/TableView";
import ChartView from "src/views/analytics/layouts/ResourceAnalyticsLayout/ChartView";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

const years = Array.from({ length: 10 }, (_, i) => ({ id: i, name: (2021 + i).toString() }));

const ResourceAnalytics = () => {
  const { user } = useAuth();

  const [type, setType] = useState<MasterType | null>(null);
  const [category, setCategory] = useState<MasterCategory | null>(null);
  const [subCategory, setSubCategory] = useState<MasterSubCategory | null>(null);
  const [item, setItem] = useState<any>(null);
  const [baseYear, setBaseYear] = useState(years[0]);
  const [tableView, setTableView] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
  const [resourceParams, setResourceParams] = useState(defaultGetRequestParam);

  // --- Queries using the object form (v5 compatible) ---
  const { data: resourceTypes, isLoading: resourceTypesLoading } = useQuery({
    queryKey: ["masterType", "resource"],
    queryFn: () => masterTypeApiService.getAll("resource", {}),
  });

  const { data: categories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["categories", type?.id],
    queryFn: () => masterCategoryApiService.getAll("resource", { filter: { resourcetype_id: type!.id } }),
    enabled: !!type?.id,
  });

  const { data: subcategories, isLoading: isSubCategoryLoading } = useQuery({
    queryKey: ["subcategories", category?.id],
    queryFn: () =>
      masterSubCategoryApiService.getAll("resource", { filter: { resourcecategory_id: category!.id } }),
    enabled: !!category?.id,
  });

  const { data: resources, isLoading: resourceLoading } = useQuery({
    queryKey: ["resources", resourceParams],
    queryFn: () => resourceApiService.getAll(resourceParams),
  });

  const { data: labels } = useQuery({
    queryKey: ["departments", user?.id],
    queryFn: () => departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }),
    enabled: !!user?.id,
  });
  useEffect(() => {
    setResourceParams({
      filter: {
        resourcetype_id: type?.id,
        resourcecategory_id: category?.id,
        resourcesubcategory_id: subCategory?.id,
      },
    })
  }, [type?.id, category?.id, subCategory?.id])

  const createData = (label: string, rest: number[]) => {
    const baseIndex = indexOf(years, baseYear);
    const data = rest.map((item) => Number((item / rest[baseIndex]) * 100).toFixed(0));
    return { label, ...data };
  };

  useEffect(() => {
    if (labels?.payload?.length) {
      setRows(
        labels?.payload?.map((region) =>
          createData(region.name, [100, 120, 140, 150, 155, 160, 170, 175, 180, 180])
        ) || []
      );
    }
  }, [labels, baseYear]);

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
        resourceTypes={resourceTypes?.payload}
        resourceTypesLoading={resourceTypesLoading}
        resourceCategories={categories?.payload}
        isCategoryLoading={isCategoryLoading}
        resourceSubCategories={subcategories?.payload}
        isSubCategoryLoading={isSubCategoryLoading}
        resources={resources?.payload}
        loading={resourceLoading}
        years={years}
        baseYear={baseYear}
        setBaseYear={setBaseYear}
      />

      <Box display="flex" gap={2} my={3} alignItems="center">
        <IconButton color={tableView ? "primary" : "secondary"} onClick={() => setTableView(true)} sx={{ display: "flex", gap: 1 }}>
          <Icon icon="mdi:table" />
          <Typography>Table</Typography>
        </IconButton>

        <IconButton color={!tableView ? "primary" : "secondary"} onClick={() => setTableView(false)} sx={{ display: "flex", gap: 1 }}>
          <Icon icon="mdi:chart-bar" />
          <Typography>Graph</Typography>
        </IconButton>
      </Box>

      <Card>
        {tableView ? (
          <TableView years={years} baseYear={indexOf(years, baseYear)} regions={labels?.payload ?? []} data={rows} />
        ) : (
          <DatePickerWrapper>
            <ChartView years={years} regions={labels?.payload ?? []} baseYear={indexOf(years, baseYear)} />
          </DatePickerWrapper>
        )}
      </Card>
    </ResourceAnalyticsLayout>
  );
};

export default ResourceAnalytics;
