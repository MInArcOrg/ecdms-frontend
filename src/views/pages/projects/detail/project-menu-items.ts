interface MenuItem {
  id: number;
  title: string;
  path: string;
  action: string;
  subject: string;
}

const menuItems = (id: string, typeId: string): MenuItem[] => [
  {
    id: 1,
    title: 'General Info',
    path: `/projects/${typeId}/details/${id}/general/detail`,
    action: 'view_projectinfo',
    subject: 'projectinfo'
  },
  {
    id: 2,
    title: 'Financial',
    path: `/projects/${typeId}/details/${id}/financial/main-contract-price`,
    action: 'view_projectfinance',
    subject: 'projectfinance'
  },
  {
    id: 3,
    title: 'Time',
    path: `/projects/${typeId}/details/${id}/time/timeline`,
    action: 'view_projecttime',
    subject: 'projecttime'
  },
  {
    id: 4,
    title: 'Stakeholder',
    path: `/projects/${typeId}/details/${id}/stakeholder`,
    action: 'view_projectstakeholder',
    subject: 'projectstakeholder'
  },
  {
    id: 5,
    title: 'Project File',
    path: `/projects/${typeId}/details/${id}/project-file/initiation`,
    action: 'view_projectfile',
    subject: 'projectfile'
  },
  {
    id: 6,
    title: 'Plan',
    path: `/projects/${typeId}/details/${id}/plan/plan`,
    action: 'view',
    subject: 'projectplan'
  },
  {
    id: 7,
    title: 'Resource',
    path: `/projects/${typeId}/details/${id}/resource`,
    action: 'view_projectresource',
    subject: 'projectresource'
  },

  {
    id: 8,
    title: 'Report',
    path: `/projects/${typeId}/details/${id}/report/summary`,
    action: 'view_projectreport',
    subject: 'projectreport'
  },
  {
    id: 9,
    title: 'Other',
    path: `/projects/${typeId}/details/${id}/other/`,
    action: 'view_other',
    subject: 'other'
  }
];
export type ProjectMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
