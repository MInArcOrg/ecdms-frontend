import { useQuery } from '@tanstack/react-query';
import React from 'react';
import departmentApiService from 'src/services/department/department-service';
import Department from 'src/types/department/department';
import Obs from 'src/views/components/org-chart';

function StructureComponent({ parentDepartment, viewAll }: { parentDepartment: Department; viewAll: boolean }) {
  const { data } = useQuery({
    queryKey: ['head-department', parentDepartment?.id],
    queryFn: () =>
      viewAll ? departmentApiService.getDepartmentStructure() : departmentApiService.getDepartmentStructure(parentDepartment?.id)
  });
  console.log('data?.payload', data?.payload);
  return data?.payload ? <Obs data={data.payload} /> : null;
}

export default StructureComponent;
