import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import resourceApiService from 'src/services/resource/resource-service';
import DetailResourceTypeList from 'src/views/pages/resources/detail/detail-resource-types/detail-resource-type-list';
import ResourceBrandList from 'src/views/pages/resources/detail/resource-brands/resource-brand-list';
import ResourceLayout from 'src/views/pages/resources/detail/resource-layout';
import ResourceQuantityPriceList from 'src/views/pages/resources/detail/resource-quantity-price/resource-quantity-price-list';
import ResourceSalaryList from 'src/views/pages/resources/detail/resource-salary/resource-salary-list';
import ResourceSpecificationList from 'src/views/pages/resources/detail/resource-specifications/resource-specification-list';
import ResourceStudyFieldList from 'src/views/pages/resources/detail/resource-study-field/resource-study-field-list';
import ResourceStudyLevelList from 'src/views/pages/resources/detail/resource-study-level/resource-study-level-list';
import ResourceWorkExperienceList from 'src/views/pages/resources/detail/resource-work-experience/resource-work-experience-list';

function LoadingSpinner() {
  return <div>Loading...</div>;
}

function Index() {
  const router = useRouter();
  const { id, typeId, all } = router.query;
  const baseRoute = `/resources/${typeId}/details/${id}`;
  const { data, isLoading } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => resourceApiService.getOne(String(id), {})
  });

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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeRoute() == 0 && <div />}
            {activeRoute() == 1 && <ResourceSpecificationList resourceId={String(id)} />}
            {activeRoute() == 2 && <ResourceBrandList resourceId={String(id)} />}
            {activeRoute() == 3 && <DetailResourceTypeList resourceId={String(id)} />}
            {activeRoute() == 4 && <ResourceQuantityPriceList resourceId={String(id)} />}
            {activeRoute() == 5 && <ResourceStudyFieldList resourceId={String(id)} />}
            {activeRoute() == 6 && <ResourceStudyLevelList resourceId={String(id)} />}
            {activeRoute() == 7 && <ResourceWorkExperienceList resourceId={String(id)} />}
            {activeRoute() == 8 && <ResourceSalaryList resourceId={String(id)} />}
          </>
        )}
      </ResourceLayout>
    </Fragment>
  );
}

Index.acl = {
  action: 'view_resources',
  subject: 'resources'
};

export default Index;
