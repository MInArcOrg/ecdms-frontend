import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import memberApiService from 'src/services/member/member-service';
import Member from 'src/types/member/member';
import ProfessionalStatus from 'src/types/member/professional-status';
import { defaultGetRequestParam } from 'src/types/requests';
import ProfessionalStatusDrawer from './professional-status-drawer';

const ProfessionalStatusComponent = ({ member }: { member: Member }) => {
  const {
    data: professionalStatuses,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['professional-status', member.id],
    queryFn: () => memberApiService.getProfessionalStatuses(member.id, defaultGetRequestParam).then((response) => response.payload)
  });

  return <ProfessionalStatusView professionalStatuses={professionalStatuses} refetch={refetch} isLoading={isLoading} member={member} />;
};
const ProfessionalStatusView = ({
  professionalStatuses,
  refetch,
  isLoading,
  member
}: {
  professionalStatuses: ProfessionalStatus[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
}) => {
  const { t: transl } = useTranslation();

  const [memberContactDrawerOpen, setAddProfessionalStatusOpen] = useState<boolean>(false);
  const [editableProfessionalStatus, setEditableProfessionalStatus] = useState<ProfessionalStatus>();
  const handleEdit = (memberContact: ProfessionalStatus) => {
    toggleProfessionalStatusDrawer();
    setEditableProfessionalStatus(memberContact);
  };
  // Access the hook methods and state

  const toggleProfessionalStatusDrawer = () => {
    setEditableProfessionalStatus({} as ProfessionalStatus);
    setAddProfessionalStatusOpen(!memberContactDrawerOpen);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={transl('professional-status')} sx={{ pb: 1.5 }} />
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
              {transl('professional-status-list')}
            </Typography>
            <IconButton onClick={toggleProfessionalStatusDrawer}>
              <Icon icon="tabler:plus" fontSize={20} />
            </IconButton>
          </Box>

          {professionalStatuses?.map((academicInfo) => {
            return (
              <Box
                key={academicInfo.id}
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
                    <CustomAvatar skin="light" sx={{ mr: 4, width: 30, height: 30 }} alt="">
                      <Icon icon={'tabler:building-arch'} />
                    </CustomAvatar>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6">{academicInfo.status}</Typography>
                    <Typography variant="body2">
                      {academicInfo.occupation} in {academicInfo.organization_name}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Button variant="tonal" sx={{ p: 2, minWidth: 38, mr: 2 }} color={'secondary'} onClick={() => handleEdit(academicInfo)}>
                    <Icon icon={'tabler:edit'} />
                  </Button>{' '}
                  <Button variant="tonal" sx={{ p: 2, minWidth: 38 }} color={'error'} onClick={() => handleEdit(academicInfo)}>
                    <Icon icon={'tabler:trash'} />
                  </Button>
                </Box>
              </Box>
            );
          })}
          {memberContactDrawerOpen && (
            <ProfessionalStatusDrawer
              member={member}
              refetch={refetch}
              open={memberContactDrawerOpen}
              toggle={toggleProfessionalStatusDrawer}
              professionalStatus={editableProfessionalStatus as ProfessionalStatus}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfessionalStatusComponent;
