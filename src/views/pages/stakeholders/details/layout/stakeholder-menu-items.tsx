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
      title: 'General Info',
      path: `${baseUrl}/general/stakeholder`,
      action: 'view_stakeholderinfo',
      subject: 'stakeholderinfo'
    },
    {
      id: 2,
      title: 'Employees',
      path: `${baseUrl}/employees/statistics`,
      action: 'view_stakeholderemployee',
      subject: 'stakeholderemployee'
    },
    {
      id: 3,
      title: 'Other',
      path: `${baseUrl}/other`,
      action: 'view_stakeholderspecific',
      subject: 'stakeholderspecific'
    },
    {
      id: 4,
      title: 'Projects',
      path: `${baseUrl}/stakeProjects`,
      action: 'view_stakeholderproject',
      subject: 'stakeholderproject'
    },
    {
      id: 5,
      title: 'Files',
      path: `${baseUrl}/files`,
      action: 'view_stakeholderfile',
      subject: 'stakeholderfile'
    }
  ];
};

export type StakeholderMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
