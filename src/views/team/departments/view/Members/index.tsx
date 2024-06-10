import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useDepartment from 'src/hooks/team/department-hook';
import teamMemberApiService from 'src/services/team/team-member-service';
import TeamMember from 'src/types/team/team-member';
import Department from 'src/types/department/department';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import ItemsListing from 'src/views/shared/listing';
import DepartmentMemberDrawer from './add/department-member-drawer';
import DepartmentMemberCard from './department-member-card';

const DepartmentMemberList = ({ department }: { department: Department }) => {
  const [memberDrawerOpen, setAddMemberOpen] = useState<boolean>(false);
  const [editableMember, setEditableMember] = useState<TeamMember>();
  const [deletableMemberId, setDeletableMemberId] = useState<string>('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // Access the hook methods and state
  const { useGetDepartmentMembers } = useDepartment();
  const { isLoading, data: data, refetch } = useGetDepartmentMembers(department.id);
  const toggleMemberDrawer = () => {
    setEditableMember({} as TeamMember);
    setAddMemberOpen(!memberDrawerOpen);
  };
  const handleOpenDeleteDialog = (memberId: string) => {
    setDeletableMemberId(memberId);
    setDeleteDialogOpen(true);
  };
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    teamMemberApiService.delete(deletableMemberId).then((res) => {
      refetch();
    });
    handleCloseDeleteDialog();
  };
  const handleEdit = (member: TeamMember) => {
    toggleMemberDrawer();
    setEditableMember(member);
  };

  return (
    <>
      <ItemsListing
        pagination={data?._attributes?.pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={(props) => (
          <DepartmentMemberCard departmentMember={props.data as TeamMember} onDelete={handleOpenDeleteDialog} onEdit={handleEdit} />
        )}
        onCreateClick={toggleMemberDrawer}
        fetchDataFunction={refetch}
        items={data?.payload}
        title="Department members"
      />
      <DeleteConfirmationDialog
        handleClose={handleCloseDeleteDialog}
        open={isDeleteDialogOpen}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
      />
      {memberDrawerOpen && (
        <DepartmentMemberDrawer
          refetch={refetch}
          open={memberDrawerOpen}
          toggle={toggleMemberDrawer}
          departmentMember={editableMember as TeamMember}
          department={department}
        />
      )}
    </>
  );
};
export default DepartmentMemberList;
