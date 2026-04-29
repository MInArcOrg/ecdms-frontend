import { useQuery } from '@tanstack/react-query';
import departmentApiService from 'src/services/department/department-service';
import Obs from 'src/views/components/org-chart';

function StructureComponent({ parentDepartmentId, viewAll }: { parentDepartmentId: string; viewAll: boolean }) {
  const { data } = useQuery({
    queryKey: ['department-structure', parentDepartmentId],
    queryFn: () =>
      viewAll ? departmentApiService.getDepartmentStructure() : departmentApiService.getDepartmentStructure(parentDepartmentId)
  });
  console.log('data', data);
  return data?.payload ? (
    <Obs
      data={
        data?.payload
          ? data?.payload?.map((item: any) => ({
            id: item.id,
            name: item.name,
            parentNodeId: item.parent_node_id || item.parentNodeId,
          }))
          : []
      }
    />
  ) : null;
}

export default StructureComponent;
