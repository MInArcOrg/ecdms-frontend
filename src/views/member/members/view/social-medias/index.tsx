import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import useSocialMedia from 'src/hooks/member/social-media-hook';
import Member from 'src/types/member/member';
import MemberSocialMedia from 'src/types/member/social-media';
import { getSocialMediaImageUrl } from 'src/utils/genral';
import Page from 'src/views/components/page/page';
import RowOptions from 'src/views/shared/listing/row-options';
import MemberSocialMediaDrawer from './member-social-media-drawer';

const SocialMedias = ({ member }: { member: Member }) => {
  const { useGetMemberSocialMedia, deleteMemberSocialMedia } = useSocialMedia() as ReturnType<typeof useSocialMedia>;
  const { memberSocialMedias, isLoading, refetch } = useGetMemberSocialMedia(member.id);

  return (
    <SocialMediaView
      socialMedias={memberSocialMedias}
      onDelete={deleteMemberSocialMedia}
      refetch={refetch}
      isLoading={isLoading}
      member={member}
    />
  );
};
const SocialMediaView = ({
  socialMedias,
  refetch,
  isLoading,
  onDelete,
  member
}: {
  socialMedias: MemberSocialMedia[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
  onDelete: (memberSocialMediaId: string) => void;
}) => {
  const { t: transl } = useTranslation();

  const [memberSocialMediaDrawerOpen, setAddMemberSocialMediaOpen] = useState<boolean>(false);
  const [editableMemberSocialMedia, setEditableMemberSocialMedia] = useState<MemberSocialMedia>();
  const handleEdit = (memberSocialMedia: MemberSocialMedia) => {
    toggleMemberSocialMediaDrawer();
    setEditableMemberSocialMedia(memberSocialMedia);
  };

  // Access the hook methods and state

  const toggleMemberSocialMediaDrawer = () => {
    setEditableMemberSocialMedia({} as MemberSocialMedia);
    setAddMemberSocialMediaOpen(!memberSocialMediaDrawerOpen);
  };
  return (
    <Page title="member-social-media">
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Social Accounts" sx={{ pb: 1.5 }} />
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
                {transl('member-social-medias')}
              </Typography>
              <IconButton onClick={toggleMemberSocialMediaDrawer}>
                <Icon icon="tabler:plus" fontSize={20} />
              </IconButton>
            </Box>

            {socialMedias?.map((account) => {
              return (
                <Box
                  key={account.id}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        mr: 4,
                        minWidth: 57,
                        display: 'flex',
                        justifyContent: 'center'
                      }}
                    >
                      <img src={getSocialMediaImageUrl(account.socialmedia.name)} alt={account.user_name} height="38" />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6">{account.socialmedia.name}</Typography>
                      <Typography
                        href={account.link}
                        component={Link}
                        onClick={(e) => e.preventDefault()}
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                      >
                        {account.user_name}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <RowOptions onDelete={() => onDelete(account.id)} onEdit={handleEdit} item={account} options={[]}></RowOptions>
                  </Box>
                </Box>
              );
            })}
            {memberSocialMediaDrawerOpen && (
              <MemberSocialMediaDrawer
                member={member}
                refetch={refetch}
                open={memberSocialMediaDrawerOpen}
                toggle={toggleMemberSocialMediaDrawer}
                memberSocialMedia={editableMemberSocialMedia as MemberSocialMedia}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Page>
  );
};

export default SocialMedias;
