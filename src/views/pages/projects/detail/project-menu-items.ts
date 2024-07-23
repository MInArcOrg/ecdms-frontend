const menuItems = (id:string, typeid:string) => [
  {
    id: 1,
    title: 'General Info',
    path: `/projects/${typeid}/details/${id}/general/detail`,
    action: 'view_projectinfo',
    subject: 'projectinfo'
  },
  {
    id: 2,
    title: 'Financial',
    path: `/projects/${typeid}/details/${id}/financial/MainContractPrice`,
    action: 'view_projectfinance',
    subject: 'projectfinance'
  },
  {
    id: 3,
    title: 'Time',
    path: `/projects/${typeid}/details/${id}/time/timeline`,
    action: 'view_projecttime',
    subject: 'projecttime'
  },
  {
    id: 4,
    title: 'Stakeholder',
    path: `/projects/${typeid}/details/${id}/stakeholder`,
    action: 'view_projectstakeholder',
    subject: 'projectstakeholder'
  },
  {
    id: 5,
    title: 'Project File',
    path: `/projects/${typeid}/details/${id}/projectFile/initiation`,
    action: 'view_projectfile',
    subject: 'projectfile'
  },
  {
    id: 6,
    title: 'Plan',
    path: `/projects/${typeid}/details/${id}/plan`,
    action: 'view_projectplan',
    subject: 'projectplan'
  },
  {
    id: 7,
    title: 'Resource',
    path: `/projects/${typeid}/details/${id}/resource`,
    action: 'view_projectresource',
    subject: 'projectresource'
  },

  {
    id: 8,
    title: 'Report',
    path: `/projects/${typeid}/details/${id}/report/summary`,
    action: 'view_projectreport',
    subject: 'projectreport'
  },
  {
    id: 9,
    title: 'Other',
    path: `/projects/${typeid}/details/${id}/other/`,
    action: 'view_other',
    subject: 'other'
  }
]

export default menuItems
