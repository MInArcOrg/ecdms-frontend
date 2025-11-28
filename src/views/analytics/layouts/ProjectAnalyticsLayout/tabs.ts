export const menuItems = (baseUrl: string) => [
  {
    id: 1,
    title: 'General Info',
    action: 'view',
    subject: 'project',
    path: `${baseUrl}`
  },
  {
    id: 2,
    title: 'Financial',
    action: 'view',
    subject: 'projectfinance',
    path: `${baseUrl}/financial`
  },
  {
    id: 3,
    title: 'Time',
    action: 'view',
    subject: 'projecttime',
    path: `${baseUrl}/time`
  },
  {
    id: 4,
    title: 'Stakeholder',
    action: 'view',
    subject: 'projectstakeholder',
    path: `${baseUrl}/stakeholder`
  },
  {
    id: 5,
    title: 'Project File',
    action: 'view',
    subject: 'projectfile',
    path: `${baseUrl}/project-file`
  },
  {
    id: 6,
    title: 'Plan',
    action: 'view',
    subject: 'projectplan',
    path: `${baseUrl}/plan`
  },
  {
    id: 7,
    title: 'Resource',
    action: 'view',
    subject: 'projectresource',
    path: `${baseUrl}/resource`
  },

  {
    id: 8,
    title: 'Report',
    action: 'view',
    subject: 'projectreport',
    path: `${baseUrl}/report`
  },
  {
    id: 9,
    title: 'Other',
    action: 'view',
    subject: 'other',
    path: `${baseUrl}/other`
  },
  {
    id: 10,
    title: 'Location',
    action: 'view',
    subject: 'location',
    path: `${baseUrl}/location`
  },
  {
    id: 11,
    title: 'Performance',
    action: 'view',
    subject: 'performance',
    path: `${baseUrl}/performance`
  },
  {
    id: 12,
    title: 'Matrix',
    action: 'view',
    subject: 'matrix',
    path: `${baseUrl}/matrixTree`
  }
];
