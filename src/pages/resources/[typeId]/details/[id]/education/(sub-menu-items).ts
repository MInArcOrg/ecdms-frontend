import { DetailSubMenuItem } from "src/types/layouts/detail-layout";

// Store the IDs in one place
export const educationMenuIds = {
  section: "EDUCATION_SECTION",
  education: "EDUCATION",
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: educationMenuIds.education,
    title: "resource.navigation.submenu.education.education",
    path: `/resources/${typeId}/details/${id}/education`,
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
