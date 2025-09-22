// Define TypeScript types for menu items

import { DetailSubMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const resourceQuantityMenuIds = {
  resourceQuantity: {
    resourceQuantity: "RESOURCE_QUANTITY",
  },
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: resourceQuantityMenuIds.resourceQuantity.resourceQuantity,
    title:
      "resource.navigation.submenu.resource-quantity.resource-quantity-section", // locale key
    subItems: [
      {
        id: resourceQuantityMenuIds.resourceQuantity.resourceQuantity,
        title:
          "resource.navigation.submenu.resource-quantity.resource-quantity", // locale key
        path: `/resources/${typeId}/details/${id}/resource-quantity/resource-quantity`,
      },
    ],
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
