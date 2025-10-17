export const menuItems = (baseUrl: string) => [
  {
    id: 1,
    title: 'General Info',
    action: 'view_projectinfo',
    subject: 'projectinfo',
    path: `${baseUrl}`
  },
  {
    id: 2,
    title: 'Financial',
    action: 'view_projectfinance',
    subject: 'projectfinance',
    path: `${baseUrl}/financial`
  },
  {
    id: 3,
    title: 'Time',
    action: 'view_projecttime',
    subject: 'projecttime',
    path: `${baseUrl}/time`
  },
  {
    id: 4,
    title: 'Stakeholder',
    action: 'view_projectstakeholder',
    subject: 'projectstakeholder',
    path: `${baseUrl}/stakeholder`
  },
  {
    id: 5,
    title: 'Project File',
    action: 'view_projectfile',
    subject: 'projectfile',
    path: `${baseUrl}/project-file`
  },
  {
    id: 6,
    title: 'Plan',
    action: 'view_projectplan',
    subject: 'projectplan',
    path: `${baseUrl}/plan`
  },
  {
    id: 7,
    title: 'Resource',
    action: 'view_projectresource',
    subject: 'projectresource',
    path: `${baseUrl}/resource`
  },

  {
    id: 8,
    title: 'Report',
    action: 'view_projectreport',
    subject: 'projectreport',
    path: `${baseUrl}/report`
  },
  {
    id: 9,
    title: 'Other',
    action: 'view_other',
    subject: 'other',
    path: `${baseUrl}/other`
  },
  {
    id: 10,
    title: 'Location',
    action: 'view_location',
    subject: 'location',
    path: `${baseUrl}/location`
  },
  {
    id: 11,
    title: 'Performance',
    action: 'view_performance',
    subject: 'performance',
    path: `${baseUrl}/performance`
  },
  {
    id: 12,
    title: 'Matrix',
    action: 'view_matrix',
    subject: 'matrix',
    path: `${baseUrl}/matrixTree`
  }
];
