import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectResourceIds = {
  finance: {
    finance: 'FINANCE',
    contractAmount: 'CONTRACT_AMOUNT',
    amendments: 'AMENDMENTS',
    supplements: 'SUPPLEMENTS',
    variations: 'VARIATIONS',
    omission: 'OMISSION',
    performanceBond: 'PERFORMANCE_BOND',
    advanceBond: 'ADVANCE_BOND',
    bidBond: 'BID_BOND',
    interimPayment: 'INTERIM_PAYMENT',
    advancePayment: 'ADVANCE_PAYMENT'
  },
  resources: {
    resources: 'RESOURCES',
    materials: 'MATERIALS',
    machinery: 'MACHINERY',
    manpower: 'MANPOWER'
  },
  documents: {
    documents: 'DOCUMENTS',
    planning: 'PLANNING',
    design: 'DESIGN',
    construction: 'CONSTRUCTION',
    other: 'OTHER'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: projectResourceIds.finance.finance,
    title: 'project.navigation.submenu.resource.finance.title',
    subItems: [
      {
        id: projectResourceIds.finance.contractAmount,
        title: 'project.navigation.submenu.resource.finance.contract-amount',
        path: `/projects/${typeId}/details/${id}/resource/finance/contract-amount`
      },
      {
        id: projectResourceIds.finance.amendments,
        title: 'project.navigation.submenu.resource.finance.amendments',
        path: `/projects/${typeId}/details/${id}/resource/finance/amendments`
      },
      {
        id: projectResourceIds.finance.supplements,
        title: 'project.navigation.submenu.resource.finance.supplements',
        path: `/projects/${typeId}/details/${id}/resource/finance/supplements`
      },
      {
        id: projectResourceIds.finance.variations,
        title: 'project.navigation.submenu.resource.finance.variations',
        path: `/projects/${typeId}/details/${id}/resource/finance/variations`
      },
      {
        id: projectResourceIds.finance.omission,
        title: 'project.navigation.submenu.resource.finance.omission',
        path: `/projects/${typeId}/details/${id}/resource/finance/omission`
      },
      {
        id: projectResourceIds.finance.performanceBond,
        title: 'project.navigation.submenu.resource.finance.performance-bond',
        path: `/projects/${typeId}/details/${id}/resource/finance/performance-bond`
      },
      {
        id: projectResourceIds.finance.advanceBond,
        title: 'project.navigation.submenu.resource.finance.advance-bond',
        path: `/projects/${typeId}/details/${id}/resource/finance/advance-bond`
      },
      {
        id: projectResourceIds.finance.bidBond,
        title: 'project.navigation.submenu.resource.finance.bid-bond',
        path: `/projects/${typeId}/details/${id}/resource/finance/bid-bond`
      },
      {
        id: projectResourceIds.finance.interimPayment,
        title: 'project.navigation.submenu.resource.finance.interim-payment',
        path: `/projects/${typeId}/details/${id}/resource/finance/interim-payment`
      },
      {
        id: projectResourceIds.finance.advancePayment,
        title: 'project.navigation.submenu.resource.finance.advance-payment',
        path: `/projects/${typeId}/details/${id}/resource/finance/advance-payment`
      }
    ]
  },
  {
    id: projectResourceIds.resources.resources,
    title: 'project.navigation.submenu.resource.resources.title',
    subItems: [
      {
        id: projectResourceIds.resources.materials,
        title: 'project.navigation.submenu.resource.resources.materials',
        path: `/projects/${typeId}/details/${id}/resource/resources/materials`
      },
      {
        id: projectResourceIds.resources.machinery,
        title: 'project.navigation.submenu.resource.resources.machinery',
        path: `/projects/${typeId}/details/${id}/resource/resources/machinery`
      },
      {
        id: projectResourceIds.resources.manpower,
        title: 'project.navigation.submenu.resource.resources.manpower',
        path: `/projects/${typeId}/details/${id}/resource/resources/manpower`
      }
    ]
  },
  {
    id: projectResourceIds.documents.documents,
    title: 'project.navigation.submenu.resource.documents.title',
    subItems: [
      {
        id: projectResourceIds.documents.planning,
        title: 'project.navigation.submenu.resource.documents.planning',
        path: `/projects/${typeId}/details/${id}/resource/documents/planning`
      },
      {
        id: projectResourceIds.documents.design,
        title: 'project.navigation.submenu.resource.documents.design',
        path: `/projects/${typeId}/details/${id}/resource/documents/design`
      },
      {
        id: projectResourceIds.documents.construction,
        title: 'project.navigation.submenu.resource.documents.construction',
        path: `/projects/${typeId}/details/${id}/resource/documents/construction`
      },
      {
        id: projectResourceIds.documents.other,
        title: 'project.navigation.submenu.resource.documents.other',
        path: `/projects/${typeId}/details/${id}/resource/documents/other`
      }
    ]
  }
];

export default subMenuItems;
