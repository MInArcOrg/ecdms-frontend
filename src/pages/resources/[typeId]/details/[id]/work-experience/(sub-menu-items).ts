import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Store the IDs in one place
export const workExperienceMenuIds = {
  section: 'WORK_EXPERIENCE_SECTION',
  workExperience: 'WORK_EXPERIENCE'
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: workExperienceMenuIds.workExperience,
    title: 'resource.navigation.submenu.work-experience.work-experience',
    path: `/resources/${typeId}/details/${id}/work-experience`
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
