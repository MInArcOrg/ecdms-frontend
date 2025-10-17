import { Box, Card, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactNode, useMemo } from 'react';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';
import DetailMenu from 'src/views/components/custom/layout/detail-menu';
import DetailSubMenu from 'src/views/components/custom/layout/detail-sub-menu';
import menuTabs from './resource-menu-items';

interface ResourceLayoutProps {
  activeMenuId: string;
  activeSubMenuId?: string;
  subMenuItems?: DetailSubMenuItem[];
  children: ReactNode;
}

// Utility functions (separation of concern)
function normalizeType(type: unknown): string | string[] | undefined {
  if (typeof type === 'string') return type;
  if (Array.isArray(type)) return type.map((t) => t.toString());
  if (type instanceof String) return type.toString();
  return undefined;
}

function filterByType(type: unknown, flag: string): boolean {
  const normalizedType = normalizeType(type);
  if (!normalizedType) return true;
  if (Array.isArray(normalizedType)) return !!flag && normalizedType.includes(flag);
  return !!flag && normalizedType === flag;
}

function filterSubMenuItems(items: DetailSubMenuItem[] | undefined, flag: string): DetailSubMenuItem[] {
  if (!items) return [];
  return items
    .filter((item) => filterByType(item.type, flag))
    .map((item) => ({
      ...item,
      subItems: item.subItems ? item.subItems.filter((subItem) => filterByType(subItem.type, flag)) : []
    }));
}

const ResourceLayout: React.FC<ResourceLayoutProps> = ({ activeMenuId, activeSubMenuId, subMenuItems, children }) => {
  const router = useRouter();
  const { id, typeId } = router.query;

  const { data: masterType } = useQuery({
    queryKey: ['masterType', 'resource', typeId],
    queryFn: () => masterTypeApiService.getOne('resource', String(typeId), {}),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    enabled: !!typeId
  });
  const filteredMenuItems = useMemo(() => {
    const flag = masterType?.payload?.flag ?? '';
    return menuTabs(id as string, typeId as string).filter((item) => filterByType(item.type, flag));
  }, [id, typeId, masterType?.payload?.flag]);

  const filteredSubMenuItems = useMemo(() => {
    const flag = masterType?.payload?.flag ?? '';
    return filterSubMenuItems(subMenuItems, flag);
  }, [subMenuItems, masterType?.payload?.flag]);

  return (
    <Box>
      <DetailMenu
        id={id as string}
        menuItems={filteredMenuItems}
        activeMenuId={activeMenuId}
        setActiveMenu={(path) => router.push(path)}
        goBack={() => router.replace(`/resources/${typeId}`)}
        typeId={String(typeId)}
      />
      <Box display="flex" flexDirection="column" gap={1} paddingTop={5}>
        {subMenuItems ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <DetailSubMenu
                  subMenuItems={filteredSubMenuItems}
                  activeSubMenuId={activeSubMenuId}
                  setActiveSubMenu={(path) => router.push(path)}
                />
              </Card>
            </Grid>
            <Grid item md={9} xs={12}>
              {children}
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default ResourceLayout;
