// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const resourcePriceMenuIds = {
  resourcePrice: {
    resourcePrice: 'RESOURCE_PRICE'
  }
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: resourcePriceMenuIds.resourcePrice.resourcePrice,
    title: 'resource.navigation.submenu.resource-price.resource-price-section', // locale key
    subItems: [
      {
        id: resourcePriceMenuIds.resourcePrice.resourcePrice,
        title: 'resource.navigation.submenu.resource-price.resource-price', // locale key
        path: `/resources/${typeId}/details/${id}/resource-price/resource-price`,
        model: 'resourceprice',
        subject: 'resourceprice',
        action: 'view'
      }
    ]
  }
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
