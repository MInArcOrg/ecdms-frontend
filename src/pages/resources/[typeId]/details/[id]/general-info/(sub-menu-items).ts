// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const generalInfoMenuIds = {
  generalInfo: {
    generalInfo: 'GENERAL_INFO',
    brands: 'BRANDS',
    specification: 'SPECIFICATION'
  },
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: 'GENERAL_INFO_SECTION',
    title: 'resource.navigation.submenu.general-info.general-info-section', // locale key
    subItems: [
      {
        id: generalInfoMenuIds.generalInfo.generalInfo,
        title: 'resource.navigation.submenu.general-info.general-info', // locale key
        path: `/resources/${typeId}/details/${id}/general-info/general-info/general-info`
      },
      {
        id: generalInfoMenuIds.generalInfo.brands,
        title: 'resource.navigation.submenu.general-info.brands', // locale key
        path: `/resources/${typeId}/details/${id}/general-info/general-info/brands`
      },
      {
        id: generalInfoMenuIds.generalInfo.specification,
        title: 'resource.navigation.submenu.general-info.specification', // locale key
        path: `/resources/${typeId}/details/${id}/general-info/general-info/specification`
      }
    ]
  },

];
export const findSubMenuItem = (items: DetailSubMenuItem[], id: string) => {
  for (const item of items) {
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.id === id) return subItem;
      }
    }
  }
  return undefined;
};
export default menuItems;
