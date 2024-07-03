import { useEffect, useState } from 'react';
import VerticalNavItems from 'src/navigation/vertical';
import { useQuery } from '@tanstack/react-query';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { MasterType } from 'src/types/master/master-types';
import { NavigationItem } from 'src/types/navigation/menu-item-types';
import { useTranslation } from 'react-i18next';

const ServerSideNavItems = () => {
  // ** Hooks
  const { t } = useTranslation();
  // ** State
  const { data: stakeTypes } = useQuery({
    queryKey: ['stakeholder'],
    queryFn: () => masterTypeApiService.getAll('stakeholder', {})
  });
  const { data: projectTypes } = useQuery({
    queryKey: ['project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  });
  const { data: resourceTypes } = useQuery({
    queryKey: ['resource'],
    queryFn: () => masterTypeApiService.getAll('resource', {})
  });
  const { data: documentTypes } = useQuery({
    queryKey: ['document'],
    queryFn: () => masterTypeApiService.getAll('document', {})
  });
  const [menuItems, setMenuItems] = useState<NavigationItem[]>([]);

  const getMenuItems = (): NavigationItem[] => {
    return [...VerticalNavItems(), ...stakeNavigation(), ...projectNavigation(), ...resourceNavigation(), ...documentNavigation()];
  };

  useEffect(() => {
    setMenuItems((prev) => (prev !== getMenuItems() ? getMenuItems() : prev));

    return () => {
      setMenuItems([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeTypes, projectTypes, resourceTypes, documentTypes]);

  // ** Get navigation items
  const stakeNavigation = (): NavigationItem[] => {
    return stakeTypes?.length < 1
      ? [
          {
            title: t('navigation.stakeholder'),
            icon: 'tabler:user',
            path: '#',
            action: 'view',
            subject: 'stakeholder'
          }
        ]
      : [
          {
            title: t('navigation.stakeholder'),
            icon: 'tabler:user',
            path: '/stakeholders',
            action: 'view',
            subject: 'stakeholder',
            children: stakeTypes?.payload?.map((type: MasterType) => {
              return {
                title: type.title,
                action: 'view',
                subject: 'stakeholder',
                path: `/stakeholders/${type.id}`
              };
            })
          }
        ];
  };

  const projectNavigation = (): NavigationItem[] => {
    return projectTypes?.length < 1
      ? [
          {
            title: 'Projects',
            icon: 'tabler:box-multiple',
            path: '#',
            action: 'view_projectinfo',
            subject: 'projectinfo'
          }
        ]
      : [
          {
            title: 'Projects',
            icon: 'tabler:box-multiple',
            action: 'view_projectinfo',
            subject: 'projectinfo',
            path: '/projects',
            children: projectTypes?.payload?.map((type: MasterType) => {
              return {
                title: type.title,
                action: 'view_projectinfo',
                subject: 'projectinfo',
                path: `/projects/${type.id}`
              };
            })
          }
        ];
  };

  const resourceNavigation = (): NavigationItem[] => {
    return resourceTypes?.length < 1
      ? [
          {
            title: 'Resources',
            icon: 'tabler:calendar',
            path: '#',
            action: 'view_projectresource',
            subject: 'projectresource'
          }
        ]
      : [
          {
            title: 'Resources',
            icon: 'tabler:calendar',
            path: '/resources',
            action: 'register_projectresource',
            subject: 'projectresource',
            children: resourceTypes?.payload?.map((type: MasterType) => {
              return {
                title: type.title,
                action: 'register_projectresource',
                subject: 'projectresource',
                path: `/resources/${type.id}`
              };
            })
          }
        ];
  };

  const documentNavigation = (): NavigationItem[] => {
    return documentTypes?.length < 1
      ? [{ title: 'Documents', icon: 'tabler:calendar' }]
      : [
          {
            title: 'Documents',
            icon: 'tabler:files',
            path: '/documents',
            children: documentTypes?.payload?.map((type: MasterType) => {
              return { title: type.title, path: `/documents/${type.id}` };
            })
          }
        ];
  };

  return { menuItems };
};

export default ServerSideNavItems;
