import { Icon } from '@iconify/react';
import { Box, Card, CardContent, CircularProgress, Grid, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import modelMenuApiService from 'src/services/general/model-menu-service';
import { getStaticPhoto, uploadImage, uploadableResourceFileTypes, useGetMultiplePhotos } from 'src/services/utils/file-utils';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ReactCropImage from 'src/views/components/custom/react-crop-image';
import DescCollapse from './desc-collapse';
import LoadingPlaceholder from 'src/views/components/loader';

interface ResourceLayoutProps {
  children: React.ReactNode;
  id: string;
  data: any;
  goBack: () => void;
  baseRoute: string;
  typeId?: string;
  isProject?: boolean;
}

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ children, id, data, goBack, baseRoute, typeId, isProject }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState<Array<{ title: string; route: string }>>([]);
  const router = useRouter();
  const { t } = useTranslation();
  const { data: typeModels, isLoading: isTypeLoading } = useQuery({
    queryKey: ['type-models', typeId],
    queryFn: () => modelMenuApiService.getByTypeId(typeId || '', {})
  });
  const { data: profilePicture, refetch: refetchProfilePicture } = useGetMultiplePhotos({
    filter: {
      model_id: typeId,
      type: 'RESOURCE_PICTURE'
    }
  });

  const handleCropComplete = (croppedImage: any) => {
    setLoading(true);
    uploadImage(croppedImage, 'RESOURCE_PICTURE', String(typeId)).then(() => {
      refetchProfilePicture();
      setLoading(false);
    });
  };

  useEffect(() => {
    if (typeModels) {
      const arr = typeModels?.sort((a: any, b: any) => {
        const order = [
          t('resource.columns.specification'),
          t('resource.columns.brand'),
          t('resource.columns.resourcetype'),
          t('resource.columns.resourcequantityandprice')
        ];
        return order.indexOf(a.model) - order.indexOf(b.model);
      });

      const routes = arr.map((module: any) => {
        const title =
          module.model === 'specification'
            ? t('resource.columns.specification')
            : module.model === 'brand'
              ? t('resource.columns.brand')
              : module.model === 'resourcetype'
                ? t('resource.columns.resourcetype')
                : module.model === 'resourcequantityandprice'
                  ? t('resource.columns.resourcequantityandprice')
                  : module.model === 'studyfield'
                    ? t('resource.columns.studyfield')
                    : module.model === 'studylevel'
                      ? t('resource.columns.studylevel')
                      : module.model === 'workexperience'
                        ? t('resource.columns.workexperience')
                        : module.model === 'salary'
                          ? t('resource.columns.salary')
                          : '';

        return {
          title: title,
          route: `${baseRoute}/${
            module.model === 'resourcequantityandprice' ? 'priceandquantity' : module.model === 'resourcetype' ? 'type' : module.model
          }/`
        };
      });
      console.log('routes', routes);

      setRoutes(routes);
    }
  }, [typeModels, baseRoute, t]);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <ReactCropImage open={open} setOpen={setOpen} onCropComplete={handleCropComplete} />
      <Card sx={{ p: 5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            pl: 3
          }}
        >
          <Icon icon="mdi:arrow-left" fontSize={20} cursor="pointer" onClick={goBack} />
          <Typography variant="body2" sx={{ cursor: 'pointer' }}>
            #{id?.substr(0, 8)}
          </Typography>
        </Box>
      </Card>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <Card>
            <Tooltip title={t('resource.form.upload_image')} placement="top" arrow>
              {loading ? (
                <LoadingPlaceholder />
              ) : (
                <Box
                  component="img"
                  sx={{ height: 160, width: '100%', cursor: isProject ? 'default' : 'pointer' }}
                  onClick={() => setOpen(isProject ? false : true)}
                  key={data?.image_id}
                  src={profilePicture?.payload[0] ? getStaticPhoto(profilePicture?.payload[0].url) : 'https://via.placeholder.com/300x300'}
                  alt="resource image"
                />
              )}
            </Tooltip>
            <CardContent>
              <Typography gutterBottom variant="h6" my={1}>
                <strong>{t('resource.form.title')}</strong>: {data?.title}
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={2}>
                <Typography variant="body1" fontWeight="bold" mr={2}>
                  {t('resource.columns.description')}:
                </Typography>
                <DescCollapse desc={data?.description} />
              </Box>
              <Box display="flex" flexWrap="wrap" mt={2}>
                <Typography variant="body1" fontWeight="bold" mr={2}>
                  {t('resource.columns.reference_files')}:
                </Typography>
                <FileDrawer id={data?.id} type={uploadableResourceFileTypes.resource} />
              </Box>
              <List>
                {isTypeLoading && <CircularProgress sx={{ ml: '50%', mt: 5 }} />}
                {routes?.map((r, index) => {
                  const isSelected = router.asPath === r.route;

                  return (
                    <ListItemButton key={index} selected={isSelected} LinkComponent={Link} href={r.route}>
                      <Box display="flex" alignItems="center" gap={5}>
                        <Icon icon="mdi:chevron-right" fontSize="1.8rem" />
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          sx={{
                            color: isSelected ? 'primary.contrastText' : 'text.primary'
                          }}
                        >
                          {r.title}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResourceLayout;
