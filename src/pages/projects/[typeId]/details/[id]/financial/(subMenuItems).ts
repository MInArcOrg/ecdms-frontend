const subMenuItems = (id, typeid) => [
  {
    id: 1,
    title: 'Main Contract Price',
    path: `/projects/${typeid}/details/${id}/financial/MainContractPrice`
  },
  {
    id: 2,
    title: 'Variation',
    path: `/projects/${typeid}/details/${id}/financial/Variation`
  },
  {
    id: 3,
    title: 'Supplement',
    path: `/projects/${typeid}/details/${id}/financial/Supplement`
  },
  {
    id: 4,
    title: 'Omission',
    path: `/projects/${typeid}/details/${id}/financial/Omission`
  },
  {
    id: 5,
    title: 'Amandment',
    path: `/projects/${typeid}/details/${id}/financial/Amandment`
  },
  {
    id: 6,
    title: 'Interim Payment',
    path: `/projects/${typeid}/details/${id}/financial/InterimPayment`
  },
  {
    id: 7,
    title: 'Advance Payment',
    path: `/projects/${typeid}/details/${id}/financial/AdvancePayment`
  },
  {
    id: 8,
    title: 'Performance Bond',
    path: `/projects/${typeid}/details/${id}/financial/PerformanceBond`
  },
  {
    id: 9,
    title: 'Advanced Bond',
    path: `/projects/${typeid}/details/${id}/financial/AdvancedBond`
  },
  {
    id: 10,
    title: 'Bid Bond',
    path: `/projects/${typeid}/details/${id}/financial/BidBond`
  }
]

export default subMenuItems
