interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.documents.documents', // Localization key for Documents
    path: `/stakeholders/${typeId}/details/${id}/documents/documents`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.documents.strategies', // Localization key for Strategies
    path: `/stakeholders/${typeId}/details/${id}/documents/strategies`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.documents.planning', // Localization key for Planning
    path: `/stakeholders/${typeId}/details/${id}/documents/planning`
  },
  {
    id: 4,
    title: 'stakeholder.navigation.submenu.documents.researches', // Localization key for Researches
    path: `/stakeholders/${typeId}/details/${id}/documents/researches`
  },
  {
    id: 5,
    title: 'stakeholder.navigation.submenu.documents.innovations', // Localization key for Innovations
    path: `/stakeholders/${typeId}/details/${id}/documents/innovations`
  },
  {
    id: 6,
    title: 'stakeholder.navigation.submenu.documents.code-of-conduct', // Localization key for Code of Conduct
    path: `/stakeholders/${typeId}/details/${id}/documents/code-of-conduct`
  },
  {
    id: 7,
    title: 'stakeholder.navigation.submenu.documents.manuals', // Localization key for Manuals
    path: `/stakeholders/${typeId}/details/${id}/documents/manuals`
  }
];

export default subMenuItems;
