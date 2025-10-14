import { useRouter } from "next/router";
import { ReactElement, Fragment, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import MasterDataNavMenu from "src/views/components/custom/layout/master-data-nav-menu";
import { appModulesWithIds } from "src/configs/app-constants";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import { resourceMasterModels } from "src/constants/master-data/resource-general-master-constants";
import Grid from "@mui/system/Unstable_Grid";
import MasterFlagAccordionMenu from "./master-flag-accordion-menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "src/@core/components/icon";

type MasterModelItem = {
  title: string;
  dbModel: string;
  flag?: string;
  // Allow other properties from different models
  [key: string]: any;
};

function GeneralMasterLayout({ children }: { children: ReactElement }) {
  const router = useRouter();
  const { t } = useTranslation();

  const { activeModule, masterDataItemsByFlag, isMasterDataSelected } = useMemo(() => {
    const pathSegments = router.asPath.split('/');
    const moduleId = pathSegments.length > 3 ? pathSegments[3] : undefined;
    const activeModule = appModulesWithIds.find((m) => m.id === moduleId) || { id: "", name: "" };

    const isMasterDataSelected = pathSegments.length > 5;

    const getMasterModelsForModule = (id?: string) => {
      switch (id) {
        case 'project':
          return projectMasterModels;
        case 'resource':
          return resourceMasterModels;
        case 'document':
          return projectMasterModels;
        case 'stakeholder':
          return projectMasterModels;
        default:
          return {};
      }
    };

    const masterDataItemsByFlag = (activeModule.flags || []).reduce(
      (acc: Record<string, any[]>, flag) => {
        acc[flag.id] = (Object.values(getMasterModelsForModule(moduleId)) as MasterModelItem[])
          .filter((item) => item.flag === flag.id)
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((item, index) => ({
            id: `${flag.id}-${index}`,
            title: t(`master-data.general-master.${item.title}`),
            path: `/master-data/general/${moduleId}/${flag.id}/${item.dbModel}`,
          }));
        return acc;
      },
      {},
    );

    return { activeModule, masterDataItemsByFlag, isMasterDataSelected };
  }, [router.asPath, t]);

  const handleModuleClick = useCallback((id: string) => {
    router.push(`/master-data/general/${id}`);
  }, [router]);

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid xs={12}> 
          <MasterDataNavMenu
            activeMenu={{ id: activeModule.id, title: activeModule.name }}
            menuItems={appModulesWithIds.filter((module) => ['project', 'resource'].includes(module.id)).map((module) => ({ id: module.id, title: module.name }))}
            setActiveMenu={handleModuleClick}
          />
        </Grid>
        {!activeModule.id ? (
          <Grid xs={12}>
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
              <Icon icon='mdi:information-outline' fontSize='2rem' />
              <Typography sx={{ mt: 2, textAlign: 'center' }}>
                {t('master-data.general-master.select-module')}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Fragment>
            <Grid xs={12} md={3}>
              <MasterFlagAccordionMenu
                activeModule={activeModule}
                masterDataItemsByFlag={masterDataItemsByFlag}
              />
            </Grid>
            <Grid xs={12} md={9}>
              {isMasterDataSelected ? (
                children
              ) : (
                <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
                  <Icon icon='mdi:gesture-tap-button' fontSize='2rem' />
                  <Typography sx={{ mt: 2, textAlign: 'center' }}>
                    {t('master-data.general-master.select-item')}
                  </Typography>
                </Box>
              )}
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Fragment>
  );
}

export default GeneralMasterLayout;
