import React from 'react'
import { getAllDepartmentStructure, getDepartmentStructureById } from 'src/services/department/department-service'
import { jsonData } from '../structure/data'
import Obs from '../structure/OrgChart'

function StructureComponent({ parentDepartment, viewAll }) {
  const [{ data, loading, error }] = viewAll
    ? getAllDepartmentStructure()
    : getDepartmentStructureById(parentDepartment?.id)

  return data ? <Obs data={data} /> : null
}

export default StructureComponent
