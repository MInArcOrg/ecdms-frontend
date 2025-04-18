import { DetailMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const resourceMenuIds = {
  generalInfo: 'GENERAL_INFO',
  price: 'PRICE',
  quantity: 'QUANTITY'
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/resources/${typeId}/details/${id}`;

  return [
    {
      id: resourceMenuIds.generalInfo,
      title: 'resource.navigation.menu.general-info',
      path: `${baseUrl}/generalInfo`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material]
    },
    {
      id: resourceMenuIds.price,
      title: 'resource.navigation.menu.price',
      path: `${baseUrl}/resource-price`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material]
    },
    {
      id: resourceMenuIds.quantity,
      title: 'resource.navigation.menu.quantity',
      path: `${baseUrl}/resource-quantity`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material]
    }
  ];
};

export const resourceTypesMaster = {
  mineral: 'MINERAL',
  material: 'MATERIAL',
  machineryAndEquipment: 'MACHINERY_AND_EQUIPMENT',
  professional: 'PROFESSIONAL',
};
export type ResourceMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
