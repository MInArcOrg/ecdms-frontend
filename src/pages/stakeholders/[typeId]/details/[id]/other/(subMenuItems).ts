import { useTranslation } from "next-i18next";
interface Route {
  id: number;
  title: string;
  path: string;
  model: string;
}

interface SubMenuItem {
  id: number;
  title: string;
  icon: string;
  routes: Route[];
}

const useSubMenuItems = (baseUrl: string): SubMenuItem[] => {
  const { t } = useTranslation("common");
  return [
    {
      id: 1,
      title: t("stakeholder.navigation.submenu.others.stakeholder-specific"),
      icon: "mdi:office-building",
      routes: [
        {
          id: 1,
          title: "stakeholder.navigation.submenu.others.field-of-study",
          path: `${baseUrl}/study-fields`,
          model: "stakeholderstudyfield",
        },
        {
          id: 2,
          title: "stakeholder.navigation.submenu.others.study-period-cost",

          path: `${baseUrl}/study-period-costs`,
          model: "studyperiodcost",
        },
        {
          id: 3,
          title: "stakeholder.navigation.submenu.others.graduates",
          path: `${baseUrl}/graduates`,
          model: "graduate",
        },
        {
          id: 4,
          title: "stakeholder.navigation.submenu.others.services",
          path: `${baseUrl}/crs`,
          model: "constructionrelatedservice",
        },
      ],
    },
  ];
};

export default useSubMenuItems;
export const findOtherModelName = (
  subMenuItems: SubMenuItem[],
  submenuId: number,
  routeId: number
): string | undefined => {
  return subMenuItems
    .find((submenu) => submenu.id === submenuId)
    ?.routes.find((route) => route.id === routeId)?.model;
};
