import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Store the IDs in one place
export const membershipMenuIds = {
  section: 'MEMBERSHIP_SECTION',
  membership: 'MEMBERSHIP'
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: membershipMenuIds.membership,
    title: 'resource.navigation.submenu.membership.membership',
    path: `/resources/${typeId}/details/${id}/membership`,
    model: 'professionalassociationmembership',
    subItems: [
      {
        id: membershipMenuIds.membership,
        title: 'resource.navigation.submenu.membership.membership',
        path: `/resources/${typeId}/details/${id}/membership`,
        model: 'professionalassociationmembership'
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
