import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useSmallTeam from 'src/hooks/team/small-team-hook';
import SmallTeam from 'src/types/team/small-team';
import Page from 'src/views/components/page/page';

import ItemsListing from 'src/views/shared/listing';
import SmallTeamDrawer from 'src/views/team/small-teams/add/small-team-drawer';
import { smallTeamColumns } from 'src/views/team/small-teams/small-team-row-column';

const SmallTeamList = ({}) => {
  const [smallTeamsDrawerOpen, setAddSmallTeamOpen] = useState<boolean>(false);
  const [editableSmallTeam, setEditableSmallTeam] = useState<SmallTeam>();
  const handleEdit = (smallTeams: SmallTeam) => {
    toggleSmallTeamDrawer();
    setEditableSmallTeam(smallTeams);
  };
  const { t: transl } = useTranslation();

  // Access the hook methods and state
  const { pagination, allSmallTeams, isLoading, addNewSmallTeam, fetchSmallTeams, deleteSmallTeam } = useSmallTeam() as ReturnType<
    typeof useSmallTeam
  >;

  const toggleSmallTeamDrawer = () => {
    setEditableSmallTeam({} as SmallTeam);
    setAddSmallTeamOpen(!smallTeamsDrawerOpen);
  };
  function handleDelete(id: string): void {
    deleteSmallTeam(id);
  }

  return (
    <Page titleId={'smallTeams'}>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleSmallTeamDrawer}
        fetchDataFunction={fetchSmallTeams}
        tableProps={{ headers: smallTeamColumns(handleEdit, handleDelete, transl) }}
        items={allSmallTeams}
        title="small-teams"
      />

      {smallTeamsDrawerOpen && (
        <SmallTeamDrawer
          refetch={fetchSmallTeams}
          addNewSmallTeam={addNewSmallTeam}
          open={smallTeamsDrawerOpen}
          toggle={toggleSmallTeamDrawer}
          smallTeam={editableSmallTeam as SmallTeam}
        />
      )}
    </Page>
  );
};
export default SmallTeamList;
