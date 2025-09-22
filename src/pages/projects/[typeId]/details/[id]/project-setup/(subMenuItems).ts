import { DetailSubMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const projectSetupIds = {
  generalInfo: {
    generalInfo: "GENERAL_INFO",
    projectInfo: "PROJECT_INFO",
    address: "ADDRESS",
    projectManager: "PROJECT_MANAGER",
    contactPerson: "CONTACT_PERSON",
    constructionType: "CONSTRUCTION_TYPE",
    constructionMethod: "CONSTRUCTION_METHOD",
  },
  stakeholders: {
    stakeholders: "STAKEHOLDERS",
  },
  time: {
    time: "TIME",
    contractPeriod: "CONTRACT_PERIOD",
    extensionTime: "EXTENSION_TIME",
  },
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectSetupIds.generalInfo.generalInfo,
    title: "project.navigation.submenu.project-setup.general-info.title",
    subItems: [
      {
        id: projectSetupIds.generalInfo.projectInfo,
        title:
          "project.navigation.submenu.project-setup.general-info.project-info",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/project-info`,
      },
      {
        id: projectSetupIds.generalInfo.address,
        title: "project.navigation.submenu.project-setup.general-info.address",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/address`,
      },
      {
        id: projectSetupIds.generalInfo.projectManager,
        title:
          "project.navigation.submenu.project-setup.general-info.project-manager",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/project-manager`,
      },
      {
        id: projectSetupIds.generalInfo.contactPerson,
        title:
          "project.navigation.submenu.project-setup.general-info.contact-person",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/contact-person`,
      },
      {
        id: projectSetupIds.generalInfo.constructionType,
        title:
          "project.navigation.submenu.project-setup.general-info.construction-type",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/construction-type`,
      },
      {
        id: projectSetupIds.generalInfo.constructionMethod,
        title:
          "project.navigation.submenu.project-setup.general-info.construction-method",
        path: `/projects/${typeId}/details/${id}/project-setup/general-info/construction-method`,
      },
    ],
  },
  {
    id: projectSetupIds.stakeholders.stakeholders,
    title: "project.navigation.submenu.project-setup.stakeholders.title",
    subItems: [
      {
        id: projectSetupIds.stakeholders.stakeholders,
        title:
          "project.navigation.submenu.project-setup.stakeholders.stakeholders",
        path: `/projects/${typeId}/details/${id}/project-setup/stakeholders/stakeholders`,
      },
    ],
  },
  {
    id: projectSetupIds.time.time,
    title: "project.navigation.submenu.project-setup.time.title",
    subItems: [
      {
        id: projectSetupIds.time.contractPeriod,
        title: "project.navigation.submenu.project-setup.time.contract-period",
        path: `/projects/${typeId}/details/${id}/project-setup/time/contract-period`,
      },
      {
        id: projectSetupIds.time.extensionTime,
        title: "project.navigation.submenu.project-setup.time.extension-time",
        path: `/projects/${typeId}/details/${id}/project-setup/time/extension-time`,
      },
    ],
  },
];

export default subMenuItems;
