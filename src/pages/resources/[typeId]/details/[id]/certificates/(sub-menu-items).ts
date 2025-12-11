// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Store the IDs in one place
export const certificatesMenuIds = {
  section: 'CERTIFICATES_SECTION',
  certificates: 'CERTIFICATES',
  recommendations: 'RECOMMENDATIONS',
  license: 'LICENSE'
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: certificatesMenuIds.section,
    title: 'resource.navigation.submenu.certificates.certificates-section',
    subItems: [
      {
        id: certificatesMenuIds.certificates,
        title: 'resource.navigation.submenu.certificates.certificates',
        path: `/resources/${typeId}/details/${id}/certificates/certificates`,
        model: 'professionalcertification'
      },
      {
        id: certificatesMenuIds.recommendations,
        title: 'resource.navigation.submenu.certificates.recommendations',
        path: `/resources/${typeId}/details/${id}/certificates/recommendations`,
        model: 'professionalrecommendation'
      },
      {
        id: certificatesMenuIds.license,
        title: 'resource.navigation.submenu.certificates.license',
        path: `/resources/${typeId}/details/${id}/certificates/license`
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
