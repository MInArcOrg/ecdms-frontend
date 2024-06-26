const baseUrl = '/master-data/general'

const menuItems = () => [
  {
    id: 1,
    title: 'Stakeholder',
    children: [
      {
        id: 1,
        title: 'OwnerShip Type',
        path: `${baseUrl}/stakeholder/ownershiptype`
      },
      {
        id: 2,
        title: 'Field of Busesiness',
        path: `${baseUrl}/stakeholder/businessFields/`
      },
      {
        id: 3,
        title: 'Levels of Study',
        path: `${baseUrl}/stakeholder/studyLevels/`
      },
      {
        id: 4,
        title: 'Study Programs',
        path: `${baseUrl}/stakeholder/studyPrograms/`
      },
      {
        id: 5,
        title: 'Feilds of Study',
        path: `${baseUrl}/stakeholder/studyFields/`
      },
      {
        id: 6,
        title: 'Age Groups',
        path: `${baseUrl}/stakeholder/ageLevels/`
      },
      {
        id: 7,
        title: 'Work Experience',
        path: `${baseUrl}/stakeholder/workExperience/`
      }
    ]
  },

  {
    id: 2,
    title: 'Project',
    children: [
      {
        id: 1,
        title: 'Project Status',
        path: `${baseUrl}/project/`
      }
    ]
  },
  {
    id: 3,
    title: 'Resource',
    children: [
      {
        id: 1,
        title: 'Construction Related Services',
        path: `${baseUrl}/resource/`
      }
    ]
  }
]

export default menuItems
