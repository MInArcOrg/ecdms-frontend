// components/AssessmentConditionMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { AssessmentCondition } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import AssessmentConditionMasterCard from "./assessment-condition-master-card";
import AssessmentConditionMasterDrawer from "./assessment-condition-master-drawer";
import assessmentConditionMasterService from "src/services/general/project/assessment-condition-master-service";

const AssessmentConditionMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<AssessmentCondition | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchAssessmentConditionMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<AssessmentCondition[]>> => {
    return assessmentConditionMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<AssessmentCondition[]>({
    queryKey: ["general-master", "assessment-condition"],
    fetchFunction: fetchAssessmentConditionMaster,
  });
  const handleDelete = async (id: string) => {
    await assessmentConditionMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as AssessmentCondition);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: AssessmentCondition) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <AssessmentConditionMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as AssessmentCondition}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.assessment-conditions`)}
            ItemViewComponent={({ data }) => (
              <AssessmentConditionMasterCard
                type={"assessment-condition"}
                generalMaster={data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                t={t}
                refetch={refetch}
              />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: "create",
                subject: `assessmentcondition`,
              },
            }}
            fetchDataFunction={refetch}
            items={types || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default AssessmentConditionMasterList;
