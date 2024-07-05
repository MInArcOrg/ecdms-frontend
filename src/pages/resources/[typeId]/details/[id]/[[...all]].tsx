import { useRouter } from 'next/router';
// import Brand from 'src/views/pages/resources/detail/Brand'
// import Type from 'src/views/pages/resources/detail/Type'
// import Price from 'src/views/pages/resources/detail/Price'
import { Fragment } from 'react';
// import StudyField from 'src/views/pages/resources/detail/StudyField'
// import StudyLevel from 'src/views/pages/resources/detail/StudyLevel'
// import Workexperience from 'src/views/pages/resources/detail/Workexperience'
// import Salary from 'src/views/pages/resources/detail/Salary'
import ResourceLayout from 'src/views/pages/resources/detail/resource-layout';
import resourceApiService from 'src/services/resource/resource-service';
import { useQuery } from '@tanstack/react-query';
import ResourceSpecificationList from 'src/views/pages/resources/detail/resource-specifications/resource-specification-list';
import { uploadImage } from 'src/services/utils/file-service';
import ResourceBrandList from 'src/views/pages/resources/detail/resource-brands/resource-brand-list';

function Index() {
  const router = useRouter();
  const { id, typeId, all } = router.query;
  const baseRoute = `/resources/${typeId}/details/${id}`;
  const {
    data,
    isLoading,
    error,
    refetch: refetchResource
  } = useQuery({
    queryKey: [],
    queryFn: () => resourceApiService.getOne(String(id), {})
  });
  // const [{ loading: imageLoading, error: imageError }, uploadFile] = uploadImage(id)

  const activeRoute = () => {
    if (all?.includes('specification')) {
      return 1;
    } else if (all?.includes('brand')) {
      return 2;
    } else if (all?.includes('type')) {
      return 3;
    } else if (all?.includes('priceandquantity')) {
      return 4;
    } else if (all?.includes('studyfield')) {
      return 5;
    } else if (all?.includes('studylevel')) {
      return 6;
    } else if (all?.includes('workexperience')) {
      return 7;
    } else if (all?.includes('salary')) {
      return 8;
    } else {
      return 0;
    }
  };

  return (
    <Fragment>
      <ResourceLayout
        id={String(id)}
        baseRoute={baseRoute}
        typeId={String(typeId)}
        goBack={() => router.replace(`/resources/${String(typeId)}`)}
        data={data?.payload}
      >
        {activeRoute() == 0 && <div />}
        {activeRoute() == 1 && <ResourceSpecificationList resourceId={String(id)} />}
        {activeRoute() == 2 && <ResourceBrandList resourceId={String(id)} />}
        {/* {activeRoute() == 3 && <Type id={id} isProject={false}/>} */}
        {/* {activeRoute() == 4 && <Price id={id} isProject={false} resourceId={''}/>} */}
        {/* {activeRoute() == 5 && <StudyField id={id} isProject={false}/>} */}
        {/* {activeRoute() == 6 && <StudyLevel id={id} isProject={false}/>} */}
        {/* {activeRoute() == 7 && <Workexperience id={id} isProject={false}/>} */}
        {/* {activeRoute() == 8 && <Salary id={id} isProject={false}/>} */}
      </ResourceLayout>
    </Fragment>
  );
}
Index.acl = {
  action: 'view_resources',
  subject: 'resources'
};

export default Index;
