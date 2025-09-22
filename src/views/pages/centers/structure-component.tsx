import { useQuery } from "@tanstack/react-query";
import departmentApiService from "src/services/department/department-service";
import Obs from "src/views/components/org-chart";

function StructureComponent({
  parentDepartmentId,
  viewAll,
}: {
  parentDepartmentId: string;
  viewAll: boolean;
}) {
  const { data } = useQuery({
    queryKey: ["head-department", parentDepartmentId],
    queryFn: () =>
      viewAll
        ? departmentApiService.getDepartmentStructure()
        : departmentApiService.getDepartmentStructure(parentDepartmentId),
  });
  return data?.payload ? (
    <Obs
      data={
        data?.payload
          ? data?.payload?.map((item: any) => ({
              ...item,
              parentNodeId: item?.parent_node_id,
            }))
          : []
      }
    />
  ) : null;
}

export default StructureComponent;
