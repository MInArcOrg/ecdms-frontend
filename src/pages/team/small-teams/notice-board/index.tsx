import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useNotice from 'src/hooks/team/notice-hook';
import Notice from 'src/types/team/notice';
import Page from 'src/views/components/page/page';

import ItemsListing from 'src/views/shared/listing';
import NoticeDrawer from 'src/views/team/notices/add/notice-drawer';
import NoticeCard from 'src/views/team/notices/notice-card';

const NoticeList = ({}) => {
  const [NoticesDrawerOpen, setAddNoticeOpen] = useState<boolean>(false);
  const [editableNotice, setEditableNotice] = useState<Notice>();
  const handleEdit = (Notices: Notice) => {
    toggleNoticeDrawer();
    setEditableNotice(Notices);
  };
  // const { t: transl } = useTranslation();

  // Access the hook methods and state
  const { pagination, allNotices, isLoading, addNewNotice, fetchNotices, deleteNotice } = useNotice() as ReturnType<typeof useNotice>;

  const toggleNoticeDrawer = () => {
    setEditableNotice({} as Notice);
    setAddNoticeOpen(!NoticesDrawerOpen);
  };
  function handleDelete(id: string): void {
    deleteNotice(id);
  }

  return (
    <Page titleId={'notices'}>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.masonry.value}
        isLoading={isLoading}
        onCreateClick={toggleNoticeDrawer}
        fetchDataFunction={fetchNotices}
        items={allNotices}
        title="notices"
        ItemViewComponent={(props) => <NoticeCard notice={props.data as Notice} onDelete={handleDelete} onEditClick={handleEdit} />}
      />

      {NoticesDrawerOpen && (
        <NoticeDrawer
          refetch={fetchNotices}
          addNewNotice={addNewNotice}
          open={NoticesDrawerOpen}
          toggle={toggleNoticeDrawer}
          notice={editableNotice as Notice}
        />
      )}
    </Page>
  );
};
export default NoticeList;
