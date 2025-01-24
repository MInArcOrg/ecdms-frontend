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
      id: 2,
      title: 'stakeholder.navigation.menu.branches',
      path: `${baseUrl}/branches`,
      action: 'view_stakeholderbranch',
      subject: 'stakeholderbranch'
    },
    {
      id: 3,
      title: 'stakeholder.navigation.menu.company-structure',
      path: `${baseUrl}/company-structure`,
      action: 'view_stakeholderstructure',
      subject: 'stakeholderstructure'
    },
    {
      id: 4,
      title: 'stakeholder.navigation.menu.resources',
      path: `${baseUrl}/resources`,
      action: 'view_stakeholderresource',
      subject: 'stakeholderresource'
    },
    {
      id: 5,
      title: 'stakeholder.navigation.menu.certificates',
      path: `${baseUrl}/certificates`,
      action: 'view_stakeholdercertificate',
      subject: 'stakeholdercertificate'
    },
    {
      id: 6,
      title: 'stakeholder.navigation.menu.documents',
      path: `${baseUrl}/documents`,
      action: 'view_stakeholderdocument',
      subject: 'stakeholderdocument'
    },
    {
      id: 7,
      title: 'stakeholder.navigation.menu.projects',
      path: `${baseUrl}/projects`,
      action: 'view_stakeholderproject',
      subject: 'stakeholderproject'
    },
    {
      id: 8,
      title: 'stakeholder.navigation.menu.services',
      path: `${baseUrl}/services`,
      action: 'view_stakeholderservice',
      subject: 'stakeholderservice'
    },
    {
      id: 9,
      title: 'stakeholder.navigation.menu.incentives',
      path: `${baseUrl}/incentives`,
      action: 'view_stakeholderincentive',
      subject: 'stakeholderincentive'
    },
    {
      id: 10,
      title: 'stakeholder.navigation.menu.study-programs',
      path: `${baseUrl}/study-programs`,
      action: 'view_stakeholderstudyprogram',
      subject: 'stakeholderstudyprogram'
    },
    {
      id: 11,
      title: 'stakeholder.navigation.menu.training',
      path: `${baseUrl}/training`,
      action: 'view_stakeholdertraining',
      subject: 'stakeholdertraining'
    }
  ];
};

export type StakeholderMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
