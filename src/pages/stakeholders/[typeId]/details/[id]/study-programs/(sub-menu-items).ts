interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.study-programs.study-programs', // Localization key for Study Programs
    path: `/stakeholders/${typeId}/details/${id}/study-programs`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.study-programs.teachers', // Localization key for Teachers
    path: `/stakeholders/${typeId}/details/${id}/teachers`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.study-programs.graduates', // Localization key for Graduates
    path: `/stakeholders/${typeId}/details/${id}/graduates`
  }
];

export default subMenuItems;
