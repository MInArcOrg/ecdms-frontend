"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import userContactPersonApiService from "src/services/admin/user-contact-person-service";
import { UserContactPerson } from "src/types/admin/user";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import UserContactPersonCard from "./user-contact-person-card";
import UserContactPersonDrawer from "./user-contact-person-drawer";
import { userContactPersonColumns } from "./user-contact-person-row";

interface UserContactPersonListProps {
  userId: string;
}

const UserContactPersonList: React.FC<UserContactPersonListProps> = ({
  userId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<UserContactPerson | null>(
    null,
  );
  const { t } = useTranslation();

  const fetchUserContactPeople = (
    params: GetRequestParam,
  ): Promise<IApiResponse<UserContactPerson[]>> => {
    return userContactPersonApiService.getAll({
      ...params,
      filter: { ...params.filter, user_id: userId },
    });
  };

  const {
    data: userContactPeople,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<UserContactPerson[]>({
    queryKey: ["userContactPeople", userId],
    fetchFunction: fetchUserContactPeople,
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (contactPerson: UserContactPerson) => {
    setSelectedRow(contactPerson);
    setShowDrawer(true);
  };

  const handleDelete = async (contactPersonId: string) => {
    await userContactPersonApiService.delete(contactPersonId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <UserContactPersonDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          contactPerson={selectedRow}
          refetch={refetch}
          userId={userId}
        />
      )}

      <ItemsListing
        title={t("department.user.contact-person.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        tableProps={{
          headers: userContactPersonColumns(handleEdit, handleDelete, t),
        }}
        ItemViewComponent={({ data }) => (
          <UserContactPersonCard
            contactPerson={data}
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
            subject: "contactperson",
          },
        }}
        fetchDataFunction={refetch}
        items={userContactPeople || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default UserContactPersonList;
