"use client";

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { UserActivityLog } from "src/types/admin/user";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import UserActivityLogCard from "./user-activity-log-card";
import { userActivityLogColumns } from "./user-activity-log-row";
import userActivityLogApiService from "src/services/admin/user-activity-log-service";

interface UserActivityLogListProps {
  userId: string;
}

const UserActivityLogList: React.FC<UserActivityLogListProps> = ({
  userId,
}) => {
  const { t } = useTranslation();

  const fetchUserActivityLog = (
    params: GetRequestParam,
  ): Promise<IApiResponse<UserActivityLog[]>> => {
    return userActivityLogApiService.getAll({
      ...params,
    });
  };

  const {
    data: userActivityLog,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<UserActivityLog[]>({
    queryKey: ["userActivityLog", userId],
    fetchFunction: fetchUserActivityLog,
  });

  return (
    <Box>
      <ItemsListing
        title={t("department.user.activity-log.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: userActivityLogColumns(t),
        }}
        ItemViewComponent={({ data }) => (
          <UserActivityLogCard userActivityLog={data} refetch={refetch} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          show: false,
        }}
        fetchDataFunction={refetch}
        items={userActivityLog || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default UserActivityLogList;
