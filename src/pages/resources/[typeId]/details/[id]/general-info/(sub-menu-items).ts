// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';
import { resourceTypesMaster } from 'src/views/pages/resources/details/layout/resource-menu-items';

// Define an object for ID constants
export const generalInfoMenuIds = {
  generalInfo: {
    generalInfo: 'GENERAL_INFO',
    professionalRegistration: 'PROFESSIONAL_REGISTRATION',
    address: 'ADDRESS',
    contact: 'CONTACT',
    contactPerson: 'CONTACT_PERSON',
    additionalInfo: 'ADDITIONAL_INFO',
    brands: 'BRANDS',
    specification: 'SPECIFICATION'
  }
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: 'GENERAL_INFO_SECTION',
    title: 'resource.navigation.submenu.general-info.general-info-section',
    subject: 'resource',
    action: 'view',
    subItems: [
      {
        id: generalInfoMenuIds.generalInfo.generalInfo,
        title: 'resource.navigation.submenu.general-info.general-info', // locale key
        path: `/resources/${typeId}/details/${id}/general-info/general-info/general-info`,
        type: [resourceTypesMaster.material, resourceTypesMaster.machineryAndEquipment],
        subject: 'resource',
        action: 'view',
        model: 'resource'
      },
      {
        id: generalInfoMenuIds.generalInfo.professionalRegistration,
        title: 'resource.navigation.submenu.general-info.professional-registration',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/professional-registration`,
        type: [resourceTypesMaster.professional],
        subject: 'resource',
        action: 'view'
      },
      {
        id: generalInfoMenuIds.generalInfo.address,
        title: 'resource.navigation.submenu.general-info.address',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/address`,
        type: [resourceTypesMaster.professional],
        subject: 'resource',
        action: 'view',
        model: 'resource'
      },
      {
        id: generalInfoMenuIds.generalInfo.contact,
        title: 'resource.navigation.submenu.general-info.contact',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/contact`,
        type: [resourceTypesMaster.professional],
        model: 'professionalcontact',
        subject: 'resource',
        action: 'view'
      },
      {
        id: generalInfoMenuIds.generalInfo.contactPerson,
        title: 'resource.navigation.submenu.general-info.contact-person',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/contact-person`,
        type: [resourceTypesMaster.professional],
        model: 'professionalcontactperson'
      },
      {
        id: generalInfoMenuIds.generalInfo.additionalInfo,
        title: 'resource.navigation.submenu.general-info.additional-info',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/additional-info`,
        type: [resourceTypesMaster.professional],
        subject: 'professionaladditionalinformation',
        action: 'view',
        model: 'professionaladditionalinformation'
      },
      {
        id: generalInfoMenuIds.generalInfo.brands,
        title: 'resource.navigation.submenu.general-info.brands',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/brands`,
        type: [resourceTypesMaster.material, resourceTypesMaster.machineryAndEquipment],
        subject: 'resourcebrand',
        model:'resourcebrand',
        action: 'view'
      },
      {
        id: generalInfoMenuIds.generalInfo.specification,
        title: 'resource.navigation.submenu.general-info.specification',
        path: `/resources/${typeId}/details/${id}/general-info/general-info/specification`,
        type: [resourceTypesMaster.material, resourceTypesMaster.machineryAndEquipment],
        subject: 'resourcespecification',
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
