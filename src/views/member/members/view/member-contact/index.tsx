import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import memberApiService from 'src/services/member/member-service';
import MemberContact from 'src/types/member/contact';
import Member from 'src/types/member/member';
import { defaultGetRequestParam } from 'src/types/requests';
import Page from 'src/views/components/page/page';
import ItemsListing from 'src/views/shared/listing';
import MemberContactCard from './member-contact-card';
import MemberContactDrawer from './member-contact-drawer';

const MemberContactComponent = ({ member }: { member: Member }) => {
  const {
    data: memberContacts,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['members-contact', member.id],
    queryFn: () => memberApiService.getMemberContacts(member.id, defaultGetRequestParam).then((response) => response.payload)
  });
  const hanldeDelete = (contactId: string) => {
    memberApiService.delete(contactId);
    refetch();
  };

  return <ContactView onDelete={hanldeDelete} contacts={memberContacts} refetch={refetch} isLoading={isLoading} member={member} />;
};
const ContactView = ({
  contacts,
  refetch,
  isLoading,
  member,
  onDelete
}: {
  contacts: MemberContact[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
  onDelete: (memberContactId: string) => void;
}) => {
  const { t: transl } = useTranslation();

  const [memberContactDrawerOpen, setAddMemberContactOpen] = useState<boolean>(false);
  const [editableMemberContact, setEditableMemberContact] = useState<MemberContact>();
  const handleEdit = (memberContact: MemberContact) => {
    toggleMemberContactDrawer();
    setEditableMemberContact(memberContact);
  };
  // Access the hook methods and state

  const toggleMemberContactDrawer = () => {
    setEditableMemberContact({} as MemberContact);
    setAddMemberContactOpen(!memberContactDrawerOpen);
  };

  return (
    <Page titleId="member-contact">
      <Grid item xs={12}>
        <Card>
          <CardHeader title={transl('member-contacts')} sx={{ pb: 1.5 }} />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                cursor: 'pointer',
                justifyContent: 'space-between',
                mb: 2
              }}
            >
              <Typography variant="body2" sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
                {transl('member-contacts-list')}
              </Typography>
              <IconButton onClick={toggleMemberContactDrawer}>
                <Icon icon="tabler:plus" fontSize={20} />
              </IconButton>
            </Box>
            <ItemsListing
              searchKeys={['name']}
              type={ITEMS_LISTING_TYPE.list.value}
              isLoading={isLoading}
              onCreateClick={toggleMemberContactDrawer}
              fetchDataFunction={refetch}
              items={contacts}
              title="member-contacts"
              ItemViewComponent={(props) => <MemberContactCard contact={props.data} {...props} onDelete={onDelete} onEdit={handleEdit} />}
              hasCreate={false}
              hasListHeader={false}
            />

            {memberContactDrawerOpen && (
              <MemberContactDrawer
                member={member}
                refetch={refetch}
                open={memberContactDrawerOpen}
                toggle={toggleMemberContactDrawer}
                memberContact={editableMemberContact as MemberContact}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Page>
  );
};

export default MemberContactComponent;
