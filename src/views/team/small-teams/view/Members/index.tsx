import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useSmallTeam from 'src/hooks/team/small-team-hook';
import teamMemberApiService from 'src/services/team/team-member-service';
import Member from 'src/types/member/member';
import Attendance from 'src/types/team/attendance';
import SmallTeam from 'src/types/team/small-team';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import ItemsListing from 'src/views/shared/listing';
import SmallTeamMemberDrawer from './add/small-team-member-drawer';
import SmallTeamMemberCard from './team-member-card';

const SmallTeamMemberList = ({ smallTeam }: { smallTeam: SmallTeam }) => {
  const [memberDrawerOpen, setAddMemberOpen] = useState<boolean>(false);
  const [editableMember, setEditableMember] = useState<Member>();
  const [deletableMemberId, setDeletableMemberId] = useState<string>('');
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  // Access the hook methods and state
  const { useGetSmallTeamMembers } = useSmallTeam();
  const { isLoading, data: data, refetch } = useGetSmallTeamMembers(smallTeam?.id);
  const toggleMemberDrawer = () => {
    setEditableMember({} as Member);
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
  const handleEdit = (member: Member) => {
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
          <SmallTeamMemberCard
            smallTeamMember={props.data as Member & { attendance: Attendance[] }}
            onDelete={handleOpenDeleteDialog}
            onEdit={handleEdit}
          />
        )}
        onCreateClick={toggleMemberDrawer}
        fetchDataFunction={refetch}
        items={data?.payload}
        title="small-team-members"
      />
      <DeleteConfirmationDialog
        handleClose={handleCloseDeleteDialog}
        open={isDeleteDialogOpen}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
      />
      {memberDrawerOpen && (
        <SmallTeamMemberDrawer
          refetch={refetch}
          open={memberDrawerOpen}
          toggle={toggleMemberDrawer}
          smallTeamMember={editableMember as Member}
          smallTeam={smallTeam}
        />
      )}
    </>
  );
};
export default SmallTeamMemberList;
