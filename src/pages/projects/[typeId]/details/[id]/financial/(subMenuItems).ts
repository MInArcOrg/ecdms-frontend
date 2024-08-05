const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Main Contract Price',
    path: `/projects/${typeId}/details/${id}/financial/main-contract-price`
  },
  {
    id: 2,
    title: 'Variation',
    path: `/projects/${typeId}/details/${id}/financial/variation`
  },
  {
    id: 3,
    title: 'Supplement',
    path: `/projects/${typeId}/details/${id}/financial/supplement`
  },
  {
    id: 4,
    title: 'Omission',
    path: `/projects/${typeId}/details/${id}/financial/omission`
  },
  {
    id: 5,
    title: 'Amendment',
    path: `/projects/${typeId}/details/${id}/financial/amendment`
  },
  {
    id: 6,
    title: 'Interim Payment',
    path: `/projects/${typeId}/details/${id}/financial/interim-payment`
  },
  {
    id: 7,
    title: 'Advance Payment',
    path: `/projects/${typeId}/details/${id}/financial/advance-payment`
  },
  {
    id: 8,
    title: 'Performance Bond',
    path: `/projects/${typeId}/details/${id}/financial/performance-bond`
  },
  {
    id: 9,
    title: 'Advanced Bond',
    path: `/projects/${typeId}/details/${id}/financial/advance-bond`
  },
  {
    id: 10,
    title: 'Bid Bond',
    path: `/projects/${typeId}/details/${id}/financial/bid-bond`
  }
];

export default subMenuItems;
