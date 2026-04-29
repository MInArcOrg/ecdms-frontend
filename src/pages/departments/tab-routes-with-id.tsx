const CentersTabRoutesWithId = (id?: string) => [
  {
    path: `/departments/sub-departements/${id}`
  },
  {
    path: `/departments/sub-departements/${id}/positions`
  },
  {
    path: `/departments/sub-departements/${id}/professionals`
  },
  {
    path: `/departments/sub-departements/${id}/centerDocuments`
  },
  {
    path: `/departments/sub-departements/${id}/structure`
  }
];

export default CentersTabRoutesWithId;
