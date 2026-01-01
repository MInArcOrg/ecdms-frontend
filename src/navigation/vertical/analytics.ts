export default [
  {
    sectionTitle: 'navigation.anlytics'
  },
  {
    title: 'Analytics',
    icon: 'tabler:chart-pie',
    children: [
      {
        title: 'Stakeholder',
        path: '/analytics/stakeholder',
        icon: 'tabler:users',
        action: 'view',
        subject: 'stakeholder'
      },
      {
        title: 'Project',
        path: '/analytics/project',
        icon: 'tabler:box-multiple',
        action: 'view',
        subject: 'project'
      },
      {
        title: 'Infrastructure',
        path: '/analytics/infrastructure',
        icon: 'tabler:box-multiple',
        action: 'view',
        subject: 'project'
      },
      {
        title: 'Resource',
        path: '/analytics/resource',
        icon: 'tabler:calendar',
        action: 'view',
        subject: 'resource'
      },
      {
        title: 'Document',
        path: '/analytics/document',
        icon: 'tabler:file',
        action: 'view',
        subject: 'document'
      }
    ]
  }
];
