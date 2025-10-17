import { Avatar, Box, Tooltip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { addDays, parseISO } from 'date-fns';
import { ChangeEvent, Fragment } from 'react';

import { useTranslation } from 'react-i18next';
import { uploadablePhotoTypes } from 'src/services/utils/file-constants';
import { getStaticPhoto, handleProfilePictureError, uploadImage, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';

// Define types for project info and time props
interface ProjectInfo {
  id: string;
  project_name?: string;
}

interface Time {
  contract_signing_date: string;
  original_contract_duration: number;
}

interface ProfileCardProps {
  projectInfo: ProjectInfo;
  time?: Time;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ projectInfo, time }) => {
  const { data: profilePicture, refetch: refetchProfilePicture } = useGetMultiplePhotos({
    filter: {
      model_id: projectInfo.id,
      type: uploadablePhotoTypes.project_profile_photo
    }
  });

  const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        uploadImage(e.target.files![0], uploadablePhotoTypes.project_profile_photo, projectInfo.id)
          .then(() => {
            refetchProfilePicture();
          })
          .catch((err) => {
            console.log(err);
            alert('Error uploading profile picture');
          });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const completionDate = addDays(parseISO(time?.contract_signing_date ?? ''), time?.original_contract_duration ?? 0);

  const { i18n, t } = useTranslation();

  return (
    <Fragment>
      <input id="upload-cover-profile" type="file" hidden />
      <Tooltip title={t('project.general-information.upload-cover-profile')} placement="top" arrow>
        <label htmlFor="upload-cover-pic">
          <CardMedia
            component="img"
            alt="profile-header"
            image="/images/cards/background-user.png"
            sx={{
              height: { xs: 50, md: 80 }
            }}
          />
        </label>
      </Tooltip>
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <input id="upload-avatar-pic" type="file" hidden onChange={changeProfilePicture} accept="image/*" />
        <label htmlFor="upload-avatar-pic">
          <Tooltip title={t('project.general-information.upload-profile-picture')} placement="top" arrow>
            <Avatar
              alt={projectInfo?.project_name}
              src={getStaticPhoto(profilePicture?.payload[0]?.url || '')}
              onError={handleProfilePictureError}
              sx={{
                width: 90,
                height: 90,
                top: '-1.5rem',
                cursor: 'pointer',
                border: (theme) => `solid ${theme.palette.common.white}`
              }}
            />
          </Tooltip>
        </label>
        <Box ml={6}>
          <Typography variant="h5">{projectInfo?.project_name}</Typography>
          <Typography variant="subtitle1">
            {time == null
              ? t('project.general-information.please-fill-contract-signing-date')
              : `${t('project.general-information.from')} ${getDynamicDate(
                  i18n,
                  time?.contract_signing_date
                ).toDateString()} - ${getDynamicDate(i18n, completionDate).toDateString()}`}
          </Typography>
        </Box>
      </CardContent>
    </Fragment>
  );
};

export default ProfileCard;
