import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ChangeEvent, Fragment, useState } from 'react';

import { useTranslation } from 'react-i18next';
import stakeholderApiService from 'src/services/stakeholder/stakeholder-service';
import { uploadablePhotoTypes } from 'src/services/utils/file-constants';
import { getStaticPhoto, handleProfilePictureError, uploadImage, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';

import { Stakeholder } from 'src/types/stakeholder';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import StakeholderDrawer from '../../stakeholder-drawer';

interface StakeholderDetailComponentProps {
  stakeholder: Stakeholder;
  refetch: () => void;
  typeId: string;
}
const StakeholderDetailComponent: React.FC<StakeholderDetailComponentProps> = ({ stakeholder, refetch, typeId }) => {
  const { data: profilePicture, refetch: refetchProfilePicture } = useGetMultiplePhotos({
    filter: {
      model_id: stakeholder.id,
      type: uploadablePhotoTypes.stakeholder_profile_photo
    }
  });
  const [showDrawer, setShowDrawer] = useState(false);

  const handleEdit = () => {
    toggleDrawer();
  };
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
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

  const { t } = useTranslation();
  const handleDelete = async (resourceId: string) => {
    await stakeholderApiService.delete(resourceId);
    refetch();
  };
  return (
    <Fragment>
      {showDrawer && (
        <StakeholderDrawer open={showDrawer} toggle={toggleDrawer} stakeholder={stakeholder} refetch={refetch} typeId={String(typeId)} />
      )}
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
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Fragment>
            <Box>
              <FileDrawer id={stakeholder.id} type={uploadableStakeholderFileTypes.stakeholder} /> &nbsp;
              <Box sx={{ display: 'flex' }}>
                <ModelActionComponent
                  model="Stakeholder"
                  model_id={stakeholder.id}
                  refetchModel={refetch}
                  resubmit={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  title={''}
                  postAction={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <RowOptions
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(stakeholder.id)}
                  item={stakeholder}
                  deletePermissionRule={{
                    action: 'delete',
                    subject: 'stakeholder'
                  }}
                  editPermissionRule={{
                    action: 'edit',
                    subject: 'stakeholder'
                  }}
                  options={[]}
                />
              </Box>
            </Box>
          </Fragment>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default StakeholderDetailComponent;
