import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useMember from 'src/hooks/member/member-hook';
import Member from 'src/types/member/member';
import MemberFilterItems from 'src/views/member/members/filter/filter';
import MemberDrawer from 'src/views/member/members/list/member-drawer';
import { memberColumns } from 'src/views/member/members/list/member-row-column';
import ItemsListing from 'src/views/shared/listing';

const MemberList = ({}) => {
  const [memberDrawerOpen, setAddMemberOpen] = useState<boolean>(false);
  const [editableMember, setEditableMember] = useState<Member>();
  const { t: transl } = useTranslation();

  const handleEdit = (member: Member) => {
    toggleMemberDrawer();
    setEditableMember(member);
  };
  // Access the hook methods and state
  const { pagination, allMembers, isLoading, deleteMember, fetchMembers } = useMember() as ReturnType<typeof useMember>;

  const toggleMemberDrawer = () => {
    setEditableMember({} as Member);
    setAddMemberOpen(!memberDrawerOpen);
  };
  return (
    <>
      <ItemsListing
        searchKeys={['name']}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleMemberDrawer}
        fetchDataFunction={fetchMembers}
        tableProps={{ headers: memberColumns(handleEdit, deleteMember, transl) }}
        items={allMembers}
        title="members"
        FilterComponentItems={MemberFilterItems}
        hasFilter={true}
        hasSearch={true}
        hasExport={true}
      />

      {memberDrawerOpen && (
        <MemberDrawer refetch={() => {}} open={memberDrawerOpen} toggle={toggleMemberDrawer} member={editableMember as Member} />
      )}
    </>
  );
};
export default MemberList;
