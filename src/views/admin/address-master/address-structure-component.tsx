import { useQuery } from "@tanstack/react-query";
import addressmasterApiService from "src/services/admin/address-master-service";
import Obs from "src/views/components/org-chart";

function AddressStructureComponent({
  parentAddressId,
  viewAll,
}: {
  parentAddressId: string;
  viewAll: boolean;
}) {
  const { data } = useQuery({
    queryKey: ["head-department", parentAddressId],
    queryFn: () =>
      viewAll
        ? addressmasterApiService.getAddressStructure(parentAddressId)
        : addressmasterApiService.getAddressStructure(parentAddressId),
  });
  console.log('structure id', parentAddressId, data);

  return data?.payload ? (
    <Obs
      data={
        data?.payload
          ? data?.payload?.map((item: any) => ({
            ...item,
            name: item?.title,
            parentNodeId: parentAddressId != item.id ? item?.parent_address_id : null,
          }))
          : []
      }
    />
  ) : null;
}

export default AddressStructureComponent;
