import { DetailMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const resourceMenuIds = {
  generalInfo: 'GENERAL_INFO',
  price: 'PRICE',
  quantity: 'QUANTITY',
  education: 'EDUCATION',
  workExperience: 'WORK_EXPERIENCE',
  certificates: 'CERTIFICATES',
  membership: 'MEMBERSHIP'
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/resources/${typeId}/details/${id}`;

  return [
    {
      id: resourceMenuIds.generalInfo,
      title: 'resource.navigation.menu.general-info',
      path: `${baseUrl}/general-info`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material, resourceTypesMaster.professional],
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.price,
      title: 'resource.navigation.menu.price',
      path: `${baseUrl}/resource-price`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material],
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.quantity,
      title: 'resource.navigation.menu.quantity',
      path: `${baseUrl}/resource-quantity`,
      type: [resourceTypesMaster.machineryAndEquipment, resourceTypesMaster.material],
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.education,
      title: 'resource.navigation.menu.education',
      path: `${baseUrl}/education`,
      type: resourceTypesMaster.professional,
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.workExperience,
      title: 'resource.navigation.menu.work-experience',
      path: `${baseUrl}/work-experience`,
      type: resourceTypesMaster.professional,
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.certificates,
      title: 'resource.navigation.menu.certificates',
      path: `${baseUrl}/certificates`,
      type: resourceTypesMaster.professional,
      action: 'view',
      subject: 'resource',
    },
    {
      id: resourceMenuIds.membership,
      title: 'resource.navigation.menu.membership',
      path: `${baseUrl}/membership`,
      type: resourceTypesMaster.professional,
      action: 'view',
      subject: 'resource',
    }
  ];
};

export const resourceTypesMaster = {
  mineral: 'MINERAL',
  material: 'MATERIAL',
  machineryAndEquipment: 'MACHINERY_AND_EQUIPMENT',
  professional: 'PROFESSIONAL'
};
export type ResourceMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
