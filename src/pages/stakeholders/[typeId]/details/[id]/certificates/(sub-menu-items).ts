interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.certificates.certificates', // Localization key for Certificates
    path: `/stakeholders/${typeId}/details/${id}/certificates/certificates/certificates`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.certificates.licenses', // Localization key for Licenses
    path: `/stakeholders/${typeId}/details/${id}/certificates/licenses`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.certificates.accreditation', // Localization key for Accreditation
    path: `/stakeholders/${typeId}/details/${id}/certificates/accreditation`
  }
];

export default subMenuItems;
