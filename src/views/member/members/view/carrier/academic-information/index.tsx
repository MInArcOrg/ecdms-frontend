import { Box, Button, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import memberApiService from 'src/services/member/member-service';
import AcademicInformation from 'src/types/member/academic-information';
import Member from 'src/types/member/member';
import { defaultGetRequestParam } from 'src/types/requests';
import { formatDate } from 'src/utils/formatter/date';
import AcademicInformationDrawer from './academic-information-drawer';

const AcademicInformationComponent = ({ member }: { member: Member }) => {
  const {
    data: academicInformations,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['academic-information', member.id],
    queryFn: () => memberApiService.getAcademicInformations(member.id, defaultGetRequestParam).then((response) => response.payload)
  });

  return <AcademicInformationView academicInformations={academicInformations} refetch={refetch} isLoading={isLoading} member={member} />;
};
const AcademicInformationView = ({
  academicInformations,
  refetch,
  isLoading,
  member
}: {
  academicInformations: AcademicInformation[];
  refetch: () => void;
  isLoading: boolean;
  member: Member;
}) => {
  const { t: transl } = useTranslation();

  const [memberContactDrawerOpen, setAddAcademicInformationOpen] = useState<boolean>(false);
  const [editableAcademicInformation, setEditableAcademicInformation] = useState<AcademicInformation>();
  const handleEdit = (memberContact: AcademicInformation) => {
    toggleAcademicInformationDrawer();
    setEditableAcademicInformation(memberContact);
  };

  // Access the hook methods and state

  const toggleAcademicInformationDrawer = () => {
    setEditableAcademicInformation({} as AcademicInformation);
    setAddAcademicInformationOpen(!memberContactDrawerOpen);
  };

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={transl('academic-information')} sx={{ pb: 1.5 }} />
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
              {transl('academic-information-list')}
            </Typography>
            <IconButton onClick={toggleAcademicInformationDrawer}>
              <Icon icon="tabler:plus" fontSize={20} />
            </IconButton>
          </Box>

          {academicInformations?.map((academicInfo) => {
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
                    <Typography variant="h6">{academicInfo.institution}</Typography>
                    <Typography variant="body2">
                      {academicInfo.level} in {academicInfo.type}
                    </Typography>

                    <Typography sx={{ color: 'primary.main', textDecoration: 'none' }} variant={'caption'}>
                      {formatDate(academicInfo.started_year)}-{formatDate(academicInfo.completed_year)}
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
            <AcademicInformationDrawer
              member={member}
              refetch={refetch}
              open={memberContactDrawerOpen}
              toggle={toggleAcademicInformationDrawer}
              academicInformation={editableAcademicInformation as AcademicInformation}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AcademicInformationComponent;
