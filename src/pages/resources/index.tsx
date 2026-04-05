import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { resourceTypesMaster } from 'src/views/pages/resources/details/layout/resource-menu-items';
import MachineryInformationList from 'src/views/pages/resources/machinery';
import ProfessionalList from 'src/views/pages/resources/professional';
import ResourceList from 'src/views/pages/resources/resource-list';

const ResourcePage = () => {
  const router = useRouter();
  const { typeId } = router.query;
  const { data: masterType } = useQuery({
    queryKey: ['masterType', 'resource', typeId],
    queryFn: () => masterTypeApiService.getOne('resource', String(typeId), {}),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    enabled: !!typeId
  });
  console.log('masterType?.payload.flag', masterType?.payload.flag);
  return masterType?.payload.flag === resourceTypesMaster.professional ? <ProfessionalList /> : masterType?.payload.flag === resourceTypesMaster.machineryAndEquipment ? <MachineryInformationList /> : <ResourceList />;
};

ResourcePage.acl = {
  subject: 'resource',
  actions: 'view'
};
export default ResourcePage;
