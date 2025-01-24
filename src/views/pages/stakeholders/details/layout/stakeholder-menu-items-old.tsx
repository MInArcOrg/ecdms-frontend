interface MenuItem {
  id: number;
  title: string;
  path: string;
  action: string;
  subject: string;
}

const menuItems = (id: string, typeId: string): MenuItem[] => {
  const baseUrl = `/stakeholders/${typeId}/details/${id}`;

  return [
    {
      id: 1,
      title: 'stakeholder.navigation.menu.general-info',
      path: `${baseUrl}/general-info`,
      action: 'view_stakeholderinfo',
      subject: 'stakeholderinfo'
    },
    {
      id: 6,
      title: 'stakeholder.navigation.menu.branches',
      path: `${baseUrl}/branches`,
      action: 'view_stakeholderbranch',
      subject: 'stakeholderbranch'
    },
    {
      id: 2,
      title: 'stakeholder.navigation.menu.employees',
      path: `${baseUrl}/employees/statistics`,
      action: 'view_stakeholderemployee',
      subject: 'stakeholderemployee'
    },
    {
      id: 3,
      title: 'stakeholder.navigation.menu.other',
      path: `${baseUrl}/other`,
      action: 'view_stakeholderspecific',
      subject: 'stakeholderspecific'
    },
    {
      id: 4,
      title: 'stakeholder.navigation.menu.projects',
      path: `${baseUrl}/stakeProjects`,
      action: 'view_stakeholderproject',
      subject: 'stakeholderproject'
    },
    {
      id: 5,
      title: 'stakeholder.navigation.menu.files',
      path: `${baseUrl}/files`,
      action: 'view_stakeholderfile',
      subject: 'stakeholderfile'
    }
  ];
};

export type StakeholderMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
