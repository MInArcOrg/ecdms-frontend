interface MenuItem {
  id: number;
  title: string;
  path: string;
  action: string;
  subject: string;
}

const menuItems = (id: string, typeId: string): MenuItem[] => {
  const baseUrl = `/resources/${typeId}/details/${id}`;

  return [
    {
      id: 1,
      title: 'resource.navigation.menu.general-info',
      path: `${baseUrl}/general-info`,
      action: 'view_generalinfo',
      subject: 'generalinfo'
    },
    {
      id: 2,
      title: 'resource.navigation.menu.licenses',
      path: `${baseUrl}/licenses`,
      action: 'view_licenses',
      subject: 'licenses'
    },
    {
      id: 3,
      title: 'resource.navigation.menu.educations',
      path: `${baseUrl}/educations`,
      action: 'view_education',
      subject: 'education'
    },
    {
      id: 4,
      title: 'resource.navigation.menu.work-experiences',
      path: `${baseUrl}/work-experiences`,
      action: 'view_workexperience',
      subject: 'workexperience'
    },
    {
      id: 5,
      title: 'resource.navigation.menu.membership',
      path: `${baseUrl}/membership`,
      action: 'view_membership',
      subject: 'membership'
    },
    {
      id: 6,
      title: 'resource.navigation.menu.achievements',
      path: `${baseUrl}/achievements`,
      action: 'view_achievements',
      subject: 'achievements'
    },
    {
      id: 7,
      title: 'resource.navigation.menu.recommendations',
      path: `${baseUrl}/recommendations`,
      action: 'view_recommendations',
      subject: 'recommendations'
    }
  ];
};

export type resourceMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
