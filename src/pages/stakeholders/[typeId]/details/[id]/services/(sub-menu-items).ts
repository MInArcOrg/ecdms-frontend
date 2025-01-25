interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.services.services', // Localization key for services
    path: `/stakeholders/${typeId}/details/${id}/services/services`
  }
];

export default subMenuItems;
