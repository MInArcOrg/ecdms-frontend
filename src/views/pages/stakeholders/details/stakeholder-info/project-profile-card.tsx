import { Avatar, Box, Card, CardContent, CardMedia, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangeEvent, Fragment } from 'react';

import { useTranslation } from 'react-i18next';
import { uploadablePhotoTypes } from 'src/services/utils/file-constants';
import { getStaticPhoto, handleProfilePictureError, uploadImage, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import { Stakeholder } from 'src/types/stakeholder';

interface StakeholderProfileSectionProps {
  stakeholder: Stakeholder;
}

const StakeholderProfileSection: React.FC<StakeholderProfileSectionProps> = ({ stakeholder }) => {
  const { data: profilePicture, refetch: refetchProfilePicture } = useGetMultiplePhotos({
    filter: {
      model_id: stakeholder.id,
      type: uploadablePhotoTypes.stakeholder_profile_photo
    }
  });

  const changeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        uploadImage(e.target.files![0], uploadablePhotoTypes.stakeholder_profile_photo, stakeholder.id)
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

  const { i18n, t } = useTranslation();

  return (
    <Fragment>
      <Card>
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
                alt={stakeholder?.trade_name}
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
            <Typography variant="h5">{stakeholder?.trade_name}</Typography>
            <Typography variant="subtitle1">{stakeholder.stakeholdertype?.title}</Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box sx={{ display: { md: 'flex' } }} alignItems="start" justifyContent="space-between" mt={7}>
            <Typography variant="body1">
              <strong>{t('Tin Number')}: </strong> {stakeholder?.tin}
            </Typography>

            <Typography variant="body1">
              <strong>{t('Type')}:</strong> {stakeholder?.stakeholdertype?.title}
            </Typography>
          </Box>

          <Box sx={{ display: { md: 'flex' } }} alignItems="start" justifyContent="space-between" mt={3}>
            <Typography variant="body1">
              <strong>{t('Ownership Type')}:</strong> {stakeholder?.ownership?.title}
            </Typography>
            <Typography variant="body1">
              <strong>{t('Field of Business')}:</strong> {stakeholder?.businessfield?.title}
            </Typography>
          </Box>

          <Box sx={{ display: { md: 'flex' } }} alignItems="start" justifyContent="space-between" mt={3}>
            <Typography variant="body1">
              <strong>{t('Category')}:</strong> {stakeholder?.stakeholdercategory?.title}
            </Typography>
            <Typography variant="body1">
              <strong>{t('Subcategory')}:</strong> {stakeholder?.stakeholdersubcategory?.title}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default StakeholderProfileSection;
