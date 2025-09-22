import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { UserWorkExperience } from "src/types/admin/user";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import WorkExperienceCard from "./user-work-experience-card";
import WorkExperienceDrawer from "./user-work-experience-drawer";
import { workexperienceColumns } from "./user-work-experience-row";
import userWorkExperienceApiService from "src/services/admin/user-educaion-experience-service";

interface UserWorkExperienceListProps {
  userId: string;
}

const UserWorkExperienceList: React.FC<UserWorkExperienceListProps> = ({
  userId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserWorkExperience | null>(
    null,
  );

  const { t } = useTranslation();

  const fetchWorkExperience = (
    params: GetRequestParam,
  ): Promise<IApiResponse<UserWorkExperience[]>> => {
    return userWorkExperienceApiService.getAll({
      ...params,
      filter: { ...params.filter, user_id: userId },
    });
  };

  const {
    data: workexperiences,
    pagination,
    handlePageChange,
    refetch,
    isLoading,
  } = usePaginatedFetch<UserWorkExperience[]>({
    queryKey: ["workexperiences"],
    fetchFunction: fetchWorkExperience,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as UserWorkExperience);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as UserWorkExperience);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (workexperience: UserWorkExperience) => {
    toggleDrawer();
    setSelectedRow(workexperience);
  };

  const handleDelete = async (workexperienceId: string) => {
    await userWorkExperienceApiService.delete(workexperienceId);
    refetch();
  };

  const handleClickDetail = (workexperience: UserWorkExperience) => {
    toggleDetailDrawer();
    setSelectedRow(workexperience);
  };

  return (
    <Box>
      {showDrawer && (
        <WorkExperienceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          workexperience={selectedRow as UserWorkExperience}
          refetch={refetch}
          userId={userId}
        />
      )}

      <ItemsListing
        title={t("department.user.work-experience.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        tableProps={{
          headers: workexperienceColumns(handleEdit, handleDelete, t),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WorkExperienceCard
            onDetail={handleClickDetail}
            workexperience={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "userworkexperience",
          },
        }}
        fetchDataFunction={refetch}
        items={workexperiences || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default UserWorkExperienceList;
