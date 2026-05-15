import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfessionalDrawer from 'src/views/pages/resources/professional/professional-drawer';
import MachineryDrawer from 'src/views/pages/resources/machinery/machinery-drawer';
import ResourceDrawer from 'src/views/pages/resources/resource-drawer';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), generalInfoMenuIds.generalInfo.generalInfo);

import { useQuery } from '@tanstack/react-query';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import professionalApiService from 'src/services/resource/professional-service';
import resourceApiService from 'src/services/resource/resource-service';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import { resourceTypesMaster } from 'src/views/pages/resources/details/layout/resource-menu-items';
import ProfessionalCard from 'src/views/pages/resources/professional/professional-card';
import MachineryCard from 'src/views/pages/resources/machinery/machinery-card';
import ResourceCard from 'src/views/pages/resources/resource-card';
import LoadingPlaceholder from 'src/views/components/loader';

const GeneralInfoPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;
  const { t } = useTranslation();

  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [professionalDrawerOpen, setProfessionalDrawerOpen] = useState(false);

  const [selectedMachinery, setSelectedMachinery] = useState<any>(null);
  const [machineryDrawerOpen, setMachineryDrawerOpen] = useState(false);

  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [resourceDrawerOpen, setResourceDrawerOpen] = useState(false);

  const { data: masterType, isLoading: isMasterLoading } = useQuery({
    queryKey: ['masterType', 'resource', typeId],
    queryFn: () => masterTypeApiService.getOne('resource', String(typeId), {}),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    enabled: !!typeId
  });

  const { data: professionalData, isLoading: pLoad, refetch: pRefetch } = useQuery({
    queryKey: ['professional', id],
    queryFn: () => professionalApiService.getById(String(id), {}),
    enabled: masterType?.payload?.flag === resourceTypesMaster.professional && !!id
  });

  const { data: machineryData, isLoading: mLoad, refetch: mRefetch } = useQuery({
    queryKey: ['machinery', id],
    queryFn: () => machineryInformationApiService.getById(String(id), {}),
    enabled: masterType?.payload?.flag === resourceTypesMaster.machineryAndEquipment && !!id
  });

  const { data: resourceData, isLoading: rLoad, refetch: rRefetch } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => resourceApiService.getOne(String(id), {}),
    enabled: masterType?.payload?.flag !== resourceTypesMaster.professional && masterType?.payload?.flag !== resourceTypesMaster.machineryAndEquipment && !!id
  });

  const isLoading = isMasterLoading || pLoad || mLoad || rLoad;
  const flag = masterType?.payload?.flag;

  return (
    <>
      <ResourceLayout
        activeMenuId={resourceMenuIds.generalInfo}
        activeSubMenuId={generalInfoMenuIds.generalInfo.generalInfo}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <>
            {flag === resourceTypesMaster.professional && professionalData?.payload && (
              <ProfessionalCard
                professional={professionalData?.payload}
                refetch={pRefetch}
                onEdit={(prof) => { setSelectedProfessional(prof); setProfessionalDrawerOpen(true); }}
                onDelete={() => { }
                }
              />
            )}
            {flag === resourceTypesMaster.machineryAndEquipment && machineryData?.payload && (
              <MachineryCard
                machineryInformation={machineryData?.payload}
                refetch={mRefetch}
                onEdit={(machinery) => { setSelectedMachinery(machinery); setMachineryDrawerOpen(true); }}
                onDelete={() => { }}
              />
            )}
            {flag !== resourceTypesMaster.professional && flag !== resourceTypesMaster.machineryAndEquipment && resourceData?.payload && (
              <ResourceCard
                resource={resourceData?.payload}
                refetch={rRefetch}
                onEdit={(res) => { setSelectedResource(res); setResourceDrawerOpen(true); }}
                onDelete={() => { }}
                t={t}
              />
            )}
          </>
        )}
      </ResourceLayout>

      <ProfessionalDrawer
        open={professionalDrawerOpen}
        toggle={() => setProfessionalDrawerOpen(!professionalDrawerOpen)}
        professional={selectedProfessional}
        refetch={pRefetch}
      />
      <MachineryDrawer
        open={machineryDrawerOpen}
        toggle={() => setMachineryDrawerOpen(!machineryDrawerOpen)}
        machineryInformation={selectedMachinery}
        departmentId={selectedMachinery?.department_id}
        refetch={mRefetch}
      />
      <ResourceDrawer
        open={resourceDrawerOpen}
        toggle={() => setResourceDrawerOpen(!resourceDrawerOpen)}
        resource={selectedResource}
        type={masterType?.payload}
        typeId={typeId as string}
        refetch={rRefetch}
      />
    </>
  );
};

// Access control configuration
GeneralInfoPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default GeneralInfoPage;
