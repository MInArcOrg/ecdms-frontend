// Define TypeScript types for menu items

import { DetailSubMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const stakeholderOrganizationIds = {
  generalInfo: {
    generalInfo: "GENERAL_INFO",
    licenses: "LICENSES",
    manager: "MANAGER",
    contactPerson: "CONTACT_PERSON",
    address: "ADDRESS",
    jointVenture: "JOINT_VENTURE",
    jointVentureCompany: "JOINT_VENTURE_COMPANY",
    upgrade: "UPGRADE",
    additionalInfo: "ADDITIONAL_INFO",
  },
  branches: {
    branches: "BRANCHES",
    branchManager: "BRANCH_MANAGER",
    branchContactPerson: "BRANCH_CONTACT_PERSON",
    address: "BRANCH_ADDRESS",
    additionalInfo: "BRANCH_ADDITIONAL_INFO",
  },
  companyStructure: {
    companyStructure: "COMPANY_STRUCTURE",
    departments: "DEPARTMENTS",
    positions: "POSITIONS",
  },
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: stakeholderOrganizationIds.generalInfo.generalInfo,
    title:
      "stakeholder.navigation.submenu.organization.general-info.general-info",
    subItems: [
      {
        id: stakeholderOrganizationIds.generalInfo.generalInfo,
        title:
          "stakeholder.navigation.submenu.organization.general-info.general-info",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/general-info`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.licenses,
        title:
          "stakeholder.navigation.submenu.organization.general-info.licenses",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/licenses`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.manager,
        title:
          "stakeholder.navigation.submenu.organization.general-info.manager",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/manager`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.contactPerson,
        title:
          "stakeholder.navigation.submenu.organization.general-info.contact-person",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/contact-people`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.address,
        title:
          "stakeholder.navigation.submenu.organization.general-info.address",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/address`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.jointVenture,
        title:
          "stakeholder.navigation.submenu.organization.general-info.joint-venture",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/joint-venture`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.jointVentureCompany,
        title:
          "stakeholder.navigation.submenu.organization.general-info.joint-venture-company",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/joint-venture-company`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.upgrade,
        title:
          "stakeholder.navigation.submenu.organization.general-info.upgrade",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/upgrade`,
      },
      {
        id: stakeholderOrganizationIds.generalInfo.additionalInfo,
        title:
          "stakeholder.navigation.submenu.organization.general-info.additional-info",
        path: `/stakeholders/${typeId}/details/${id}/organization/general-info/additional-info`,
      },
    ],
  },
  {
    id: stakeholderOrganizationIds.branches.branches,
    title: "stakeholder.navigation.submenu.organization.branches.branches",
    subItems: [
      {
        id: stakeholderOrganizationIds.branches.branchManager,
        title:
          "stakeholder.navigation.submenu.organization.branches.branch-manager",
        path: `/stakeholders/${typeId}/details/${id}/organization/branches/branch-manager`,
      },
      {
        id: stakeholderOrganizationIds.branches.branchContactPerson,
        title:
          "stakeholder.navigation.submenu.organization.branches.branch-contact-person",
        path: `/stakeholders/${typeId}/details/${id}/organization/branches/branch-contact-person`,
      },
      {
        id: stakeholderOrganizationIds.branches.address,
        title: "stakeholder.navigation.submenu.organization.branches.address",
        path: `/stakeholders/${typeId}/details/${id}/organization/branches/address`,
      },
      {
        id: stakeholderOrganizationIds.branches.additionalInfo,
        title:
          "stakeholder.navigation.submenu.organization.branches.additional-info",
        path: `/stakeholders/${typeId}/details/${id}/organization/branches/additional-info`,
      },
    ],
  },
  {
    id: stakeholderOrganizationIds.companyStructure.companyStructure,
    title:
      "stakeholder.navigation.submenu.organization.company-structure.company-structure",
    subItems: [
      {
        id: stakeholderOrganizationIds.companyStructure.departments,
        title:
          "stakeholder.navigation.submenu.organization.company-structure.departments",
        path: `/stakeholders/${typeId}/details/${id}/organization/company-structure/departments`,
      },
      {
        id: stakeholderOrganizationIds.companyStructure.positions,
        title:
          "stakeholder.navigation.submenu.organization.company-structure.positions",
        path: `/stakeholders/${typeId}/details/${id}/organization/company-structure/positions`,
      },
    ],
  },
];

export default menuItems;
