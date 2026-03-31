import {
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AddressMaster,
  AddressType,
  addressTypes,
} from 'src/types/admin/address';
import AddressMasterList from './list';
import { useQuery } from '@tanstack/react-query';
import addressmasterApiService from 'src/services/admin/address-master-service';
import { useRouter } from 'next/router';
import LoadingPlaceholder from 'src/views/components/loader';

// New Interface
interface AddressMasterViewProps {
  parentId?: string;
  initialType?: AddressType;
}

const AddressMasterView = (props: AddressMasterViewProps) => {
  const { t } = useTranslation();
  const { parentId, initialType } = props;
  const route = useRouter();

  // --- QUERIES ---

  // 1. Fetch the specific parent data (e.g., the specific Region)
  const { data: parentAddressMasterResponse, isLoading: isParentLoading } = useQuery({
    queryKey: ['address-master', parentId],
    queryFn: () => addressmasterApiService.getOne(parentId as string, {}),
    enabled: !!parentId,
  });

  const parentAddressMaster = parentAddressMasterResponse?.payload;

  const { data: addressTree } = useQuery({
    queryKey: ['address-master-tree', parentId],
    queryFn: () => addressmasterApiService.getAllParentAddressMastersTree(parentId as string),
    enabled: !!parentId
  });

  // 2. Fetch the root data (used for redirection if at root level /country)
  const { data: rootAddressMaster, isLoading: isRootLoading } = useQuery({
    queryKey: ['root-address-master'],
    queryFn: () =>
      addressmasterApiService.getAll({
        filter: { is_root: 1 },
      }),
  });

  // --- STATE ---
  const [activeType, setActiveType] = useState<AddressType | undefined>(initialType);

  // --- LOGIC: Redirection for Root Level (e.g., /address-master/country) ---
  useEffect(() => {
    if (initialType === AddressType.COUNTRY&&rootAddressMaster && rootAddressMaster?.payload?.length > 0 && !parentId) {
      // If we are viewing the Country level (initialType=COUNTRY) and there's no specific parent selected (no parentId),
      // we auto-redirect to view the children of the first found root address.
      route.replace(`/address-master/${rootAddressMaster.payload[0].type}/${rootAddressMaster.payload[0].id}`);
    }
  }, [initialType, rootAddressMaster, parentId, route]);

  // --- LOGIC: Calculate Available Tabs (IMPROVED) ---
  const availableTabs = useMemo(() => {
    // Determine the type whose children we should display in the tabs.
    // 1. If we have a specific parent loaded, use the parent's type.
    // 2. Otherwise, use the initial type from the URL.
    const typeToLookup = parentAddressMaster?.type || initialType;

    if (!typeToLookup) return [];

    // Find the configuration matching the determined type
    const parentConfig = addressTypes.find((c) => c.type === typeToLookup);

    // If the list is empty (0 children), but we are at the root, the list itself should be the tab.
    // However, since we auto-redirect the root, we can simplify:
    return parentConfig?.children || [];
  }, [parentAddressMaster, initialType]);

  // --- LOGIC: Sync Active Tab ---
  useEffect(() => {
    // 1. If we have tabs, ensure the activeType is one of the valid children types.
    if (availableTabs.length > 0 && !availableTabs.includes(activeType as AddressType)) {
      setActiveType(availableTabs[0]);
    } else if (initialType) {
      // 2. If no tabs are available (leaf node), just show the initial type.
      setActiveType(initialType);
    }
  }, [availableTabs, initialType]);

  // --- HANDLER: Tab Change ---
  const handleTabChange = (_: React.SyntheticEvent, newValue: AddressType) => {
    setActiveType(newValue);
    // Optional: Update the URL to reflect the new active tab, keeping parentId constant.
    // route.replace(`/address-master/${newValue}/${parentId}`, undefined, { shallow: true });
  };

  const isInitialLoad = isRootLoading || (!!parentId && isParentLoading);

  if (isInitialLoad) {
    return (
      <Grid item xs={12}>
        <LoadingPlaceholder />
      </Grid>
    );
  }

  const renderBreadcrumbs = () => {
    if (!addressTree?.payload?.length) return null;

    return (
      <Typography variant="subtitle1" sx={{ alignSelf: 'end', textDecoration: 'none' }} paddingBottom={2} fontSize={13}>
        {addressTree.payload.map((item: AddressMaster) => (
          <span key={item.id}>
            <Typography
              component={Link}
              href={`/address-master/${item.type}/${item.id}`}
              sx={{ textDecoration: 'none' }}
            >
              {item.title}/
            </Typography>
            &nbsp;&nbsp;
          </span>
        ))}
      </Typography>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {renderBreadcrumbs()}
      </Grid>
      {/* LEFT: Parent Address Card */}
      <Grid item xs={12} md={4} lg={3}>
        {parentAddressMaster && (
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              backgroundColor: 'background.paper',
              height: '100%',
            }}
          >
            <CardContent>
              {/* ... Parent Card Content remains the same ... */}
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h4" fontWeight={500}>
                    {parentAddressMaster.title || '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {t('address-master.columns.type')}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {parentAddressMaster.type || '-'}
                  </Typography>
                  <Typography
                    href={`/address-master/structure/${parentAddressMaster.id}`}
                    component={Link}
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'primary.main',
                    }}
                    mb={2}
                  >
                    {t('address-master.address-structure')}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* RIGHT: Tabs & List */}
      <Grid item xs={12} md={8} lg={9}>
        {/* Render Tabs ONLY if multiple children types exist */}
        {availableTabs.length > 1 && activeType && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={activeType}
              onChange={handleTabChange}
              aria-label="address type tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              {availableTabs.map((childType) => (
                <Tab
                  key={childType}
                  label={t(`address-master.${childType.toLowerCase()}`)}
                  value={childType}
                />
              ))}
            </Tabs>
          </Box>
        )}

        {/* Render the List, passing the active type and parent context */}
        {activeType && (
          <AddressMasterList
            type={activeType}
            parentId={parentId}
            parentAddressMaster={parentAddressMaster || ({} as AddressMaster)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default AddressMasterView;
