// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const stakeholderResourceIds = {
  resources: {
    resources: 'RESOURCES',
    machineries: 'MACHINERIES',
    vehicles: 'VEHICLES',
    safetyEquipment: 'SAFETY_EQUIPMENT',
    constructionMaterials: 'CONSTRUCTION_MATERIALS',
    employees: 'EMPLOYEES'
  },
  documents: {
    strategies: 'STRATEGIES',
    planning: 'PLANNING',
    researches: 'RESEARCHES',
    innovations: 'INNOVATIONS',
    codeOfConduct: 'CODE_OF_CONDUCT',
    manuals: 'MANUALS',
    documents: 'DOCUMENTS'
  },
  certificates: {
    certificates: 'CERTIFICATES',
    accreditation: 'ACCREDITATION'
  }
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: stakeholderResourceIds.resources.resources,
    title: 'stakeholder.navigation.submenu.resource.resources.resources',
    subItems: [
      {
        id: stakeholderResourceIds.resources.machineries,
        title: 'stakeholder.navigation.submenu.resource.resources.machineries',
        path: `/stakeholders/${typeId}/details/${id}/resource/resources/machineries`
      },
      {
        id: stakeholderResourceIds.resources.vehicles,
        title: 'stakeholder.navigation.submenu.resource.resources.vehicles',
        path: `/stakeholders/${typeId}/details/${id}/resource/resources/vehicles`,
        model: 'vehicle'
      },
      {
        id: stakeholderResourceIds.resources.safetyEquipment,
        title: 'stakeholder.navigation.submenu.resource.resources.safety-equipment',
        path: `/stakeholders/${typeId}/details/${id}/resource/resources/safety-equipment`
      },
      {
        id: stakeholderResourceIds.resources.constructionMaterials,
        title: 'stakeholder.navigation.submenu.resource.resources.construction-materials',
        path: `/stakeholders/${typeId}/details/${id}/resource/resources/construction-materials`
      },
      {
        id: stakeholderResourceIds.resources.employees,
        title: 'stakeholder.navigation.submenu.resource.resources.employees',
        path: `/stakeholders/${typeId}/details/${id}/resource/resources/employees`
      }
    ]
  },
  {
    id: stakeholderResourceIds.documents.documents,
    title: 'stakeholder.navigation.submenu.resource.documents.documents',
    subItems: [
      {
        id: stakeholderResourceIds.documents.strategies,
        title: 'stakeholder.navigation.submenu.resource.documents.strategies',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/strategies`
      },
      {
        id: stakeholderResourceIds.documents.planning,
        title: 'stakeholder.navigation.submenu.resource.documents.planning',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/planning`
      },
      {
        id: stakeholderResourceIds.documents.researches,
        title: 'stakeholder.navigation.submenu.resource.documents.researches',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/researches`
      },
      {
        id: stakeholderResourceIds.documents.innovations,
        title: 'stakeholder.navigation.submenu.resource.documents.innovations',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/innovations`
      },
      {
        id: stakeholderResourceIds.documents.codeOfConduct,
        title: 'stakeholder.navigation.submenu.resource.documents.code-of-conduct',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/code-of-conduct`
      },
      {
        id: stakeholderResourceIds.documents.manuals,
        title: 'stakeholder.navigation.submenu.resource.documents.manuals',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/manuals`
      },
      {
        id: stakeholderResourceIds.documents.documents,
        title: 'stakeholder.navigation.submenu.resource.documents.documents',
        path: `/stakeholders/${typeId}/details/${id}/resource/documents/documents`
      }
    ]
  },
  {
    id: stakeholderResourceIds.certificates.certificates,
    title: 'stakeholder.navigation.submenu.resource.certificates.certificates',
    subItems: [
      {
        id: stakeholderResourceIds.certificates.certificates,
        title: 'stakeholder.navigation.submenu.resource.certificates.certificates',
        path: `/stakeholders/${typeId}/details/${id}/resource/certificates/certificates`
      },
      {
        id: stakeholderResourceIds.certificates.accreditation,
        title: 'stakeholder.navigation.submenu.resource.certificates.accreditation',
        path: `/stakeholders/${typeId}/details/${id}/resource/certificates/accreditation`
      }
    ]
  }
];

export default menuItems;
