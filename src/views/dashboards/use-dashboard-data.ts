import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import dashboardApiService from 'src/services/dashboard/dashboard-service';
import departmentApiService from 'src/services/department/department-service';
import { defaultGetRequestParam } from 'src/types/requests';
import { formatDepartmentName } from 'src/utils/formatter/department';
import { BreakdownType, DashboardSummary, getTypeCount, safeNumber } from './dashboard-utils';

type SplitItem = { key: string; label: string; value: number };
type SplitDetailPoint = { label: string; value: number };

export const useDashboardData = (departmentId?: string) => {
  const [useDummyData, setUseDummyData] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>('ALL');

  const handleDepartmentChange = (nextDepartmentId: string) => {
    setSelectedDepartmentId(nextDepartmentId || 'ALL');
  };

  const departmentFilter = useMemo(() => {
    if (!selectedDepartmentId || selectedDepartmentId === 'ALL') return undefined;
    return { department_id: selectedDepartmentId };
  }, [selectedDepartmentId]);

  const cardParams = useMemo(() => ({ filter: departmentFilter }), [departmentFilter]);
  const parseSplitItems = (payload: any): SplitItem[] => {
    if (!payload) return [];

    if (Array.isArray(payload)) {
      return payload
        .map((item, idx) => {
          const value = safeNumber(item?.value);
          const key = String(item?.subcategory_id || item?.id || item?.key || item?.subcategory || idx);
          const label = String(item?.subcategory || item?.name || item?.label || item?.key || '');
          return { key, label, value };
        })
        .filter((x) => x.key && x.label);
    }

    if (Array.isArray(payload?.subcategories)) {
      return payload.subcategories
        .map((sub: any, idx: number) => {
          const value = safeNumber(sub?.value);
          const key = String(sub?.id || sub?.subcategory_id || idx);
          const label = String(sub?.subcategory || sub?.name || sub?.label || '');
          return { key, label, value };
        })
        .filter((x: SplitItem) => x.key && x.label);
    }

    return [];
  };

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('dashboard_use_dummy_data');
      if (saved === 'true') setUseDummyData(true);
    } catch {
      setUseDummyData(false);
    }
  }, []);

  useEffect(() => {
    if (!departmentId) return;
    setSelectedDepartmentId('ALL');
  }, [departmentId]);

  const handleToggleDummyData = (_event: unknown, checked: boolean) => {
    setUseDummyData(checked);
    try {
      window.localStorage.setItem('dashboard_use_dummy_data', checked ? 'true' : 'false');
    } catch {
      return;
    }
  };

  const { data: departmentsData } = useQuery({
    queryKey: ['departments', 'dashboard-selector'],
    queryFn: () => departmentApiService.getAll({ ...defaultGetRequestParam, pagination: { page: 1, pageSize: 100000 } }),
    enabled: true
  });

  const departments = departmentsData?.payload || [];

  const { data: selectedDepartmentData, isLoading: isDepartmentLoading } = useQuery({
    queryKey: ['department-data', selectedDepartmentId],
    queryFn: () => departmentApiService.getOne(selectedDepartmentId, {}),
    enabled: Boolean(selectedDepartmentId && selectedDepartmentId !== 'ALL' && !useDummyData)
  });

  const departmentName = selectedDepartmentId === 'ALL' ? 'All Departments' : formatDepartmentName(selectedDepartmentData?.payload?.name || '');

  const dummySummary: DashboardSummary = useMemo(
    () => ({
      stakeholder: { types: [{ contractors: 128 }, { consultants: 110 }, { suppliers: 46 }, { government: 22 }] },
      project: { types: [{ road_projects: 65 }, { building_projects: 52 }, { bridge_projects: 18 }, { other_projects: 9 }] },
      resource: { types: [{ machinery_and_equipment: 44 }, { materials: 88 }, { labor: 61 }] },
      document: { types: [{ reports: 140 }, { contracts: 96 }, { drawings: 120 }] }
    }),
    []
  );

  const dummySummaryWithTotals: DashboardSummary = useMemo(() => {
    const sumTypes = (types?: BreakdownType[]) =>
      (types || []).reduce((sum, obj) => {
        const entry = Object.entries(obj)[0];
        return sum + safeNumber(entry?.[1]);
      }, 0);

    return {
      stakeholder: { types: dummySummary.stakeholder?.types || [], total: sumTypes(dummySummary.stakeholder?.types) },
      project: { types: dummySummary.project?.types || [], total: sumTypes(dummySummary.project?.types) },
      resource: { types: dummySummary.resource?.types || [], total: sumTypes(dummySummary.resource?.types) },
      document: { types: dummySummary.document?.types || [], total: sumTypes(dummySummary.document?.types) }
    };
  }, [dummySummary]);

  const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
    const response = await dashboardApiService.getProjectTypeStats(cardParams);
    return (response?.payload as DashboardSummary) || {};
  };

  const {
    data: stakeholderBreakdown,
    isLoading: isStakeholderLoading,
    isError: isStakeholderError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'stakeholders', selectedDepartmentId],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: projectBreakdown,
    isLoading: isProjectLoading,
    isError: isProjectError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'projects', selectedDepartmentId],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: resourceBreakdown,
    isLoading: isResourceLoading,
    isError: isResourceError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'resources', selectedDepartmentId],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: contractorsKpiSummary,
    isLoading: isContractorsKpiLoading,
    isError: isContractorsKpiError
  } = useQuery({
    queryKey: ['dashboard', 'kpi', 'contractors'],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: consultantsKpiSummary,
    isLoading: isConsultantsKpiLoading,
    isError: isConsultantsKpiError
  } = useQuery({
    queryKey: ['dashboard', 'kpi', 'consultants'],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: roadProjectsKpiSummary,
    isLoading: isRoadProjectsKpiLoading,
    isError: isRoadProjectsKpiError
  } = useQuery({
    queryKey: ['dashboard', 'kpi', 'road-projects'],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: buildingProjectsKpiSummary,
    isLoading: isBuildingProjectsKpiLoading,
    isError: isBuildingProjectsKpiError
  } = useQuery({
    queryKey: ['dashboard', 'kpi', 'building-projects'],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const {
    data: machineryKpiSummary,
    isLoading: isMachineryKpiLoading,
    isError: isMachineryKpiError
  } = useQuery({
    queryKey: ['dashboard', 'kpi', 'machinery'],
    queryFn: fetchDashboardSummary,
    enabled: !useDummyData
  });

  const summary: DashboardSummary = useDummyData ? dummySummaryWithTotals : {};
  const resolvedStakeholder = useDummyData ? dummySummaryWithTotals : stakeholderBreakdown || {};
  const resolvedProject = useDummyData ? dummySummaryWithTotals : projectBreakdown || {};
  const resolvedResource = useDummyData ? dummySummaryWithTotals : resourceBreakdown || {};

  const totals = useMemo(() => {
    const stakeholderTotal = safeNumber((useDummyData ? dummySummaryWithTotals : stakeholderBreakdown)?.stakeholder?.total);
    const projectTotal = safeNumber((useDummyData ? dummySummaryWithTotals : projectBreakdown)?.project?.total);
    const resourceTotal = safeNumber((useDummyData ? dummySummaryWithTotals : resourceBreakdown)?.resource?.total);
    const documentTotal = safeNumber((useDummyData ? dummySummaryWithTotals : stakeholderBreakdown)?.document?.total);
    const sum = stakeholderTotal + projectTotal + resourceTotal + documentTotal;
    return { stakeholderTotal, projectTotal, resourceTotal, documentTotal, sum };
  }, [dummySummaryWithTotals, projectBreakdown, resourceBreakdown, stakeholderBreakdown, useDummyData]);

  const kpis = useMemo(() => {
    const contractors = getTypeCount(
      (useDummyData ? dummySummaryWithTotals : contractorsKpiSummary)?.stakeholder?.types,
      ['contractor']
    );
    const consultants = getTypeCount(
      (useDummyData ? dummySummaryWithTotals : consultantsKpiSummary)?.stakeholder?.types,
      ['consultants']
    );
    const roadProjects = getTypeCount((useDummyData ? dummySummaryWithTotals : roadProjectsKpiSummary)?.project?.types, ['road']);
    const buildingProjects = getTypeCount(
      (useDummyData ? dummySummaryWithTotals : buildingProjectsKpiSummary)?.project?.types,
      ['building']
    );
    const machinery = getTypeCount((useDummyData ? dummySummaryWithTotals : machineryKpiSummary)?.resource?.types, ['machinery_and_equipment']);
    return { contractors, consultants, roadProjects, buildingProjects, machinery };
  }, [
    buildingProjectsKpiSummary,
    contractorsKpiSummary,
    consultantsKpiSummary,
    dummySummaryWithTotals,
    machineryKpiSummary,
    roadProjectsKpiSummary,
    useDummyData
  ]);

  const dummySplit = useMemo(() => {
    const allocate = (total: number, weights: number[]) => {
      const safeTotal = Math.max(0, Math.floor(total));
      const normalizedWeights = weights.map((w) => (Number.isFinite(w) ? Math.max(0, w) : 0));
      const sumWeights = normalizedWeights.reduce((a, b) => a + b, 0);
      if (!safeTotal || !sumWeights) return normalizedWeights.map(() => 0);
      const raw = normalizedWeights.map((w) => (safeTotal * w) / sumWeights);
      const floors = raw.map((v) => Math.floor(v));
      let remainder = safeTotal - floors.reduce((a, b) => a + b, 0);
      const order = raw
        .map((v, i) => ({ i, frac: v - Math.floor(v) }))
        .sort((a, b) => b.frac - a.frac)
        .map((x) => x.i);
      const result = [...floors];
      for (let k = 0; k < remainder; k += 1) result[order[k % order.length]] += 1;
      return result;
    };

    const contractorTotal = kpis.contractors > 0 ? kpis.contractors : 128;
    const consultantTotal = kpis.consultants > 0 ? kpis.consultants : 110;
    const roadTotal = kpis.roadProjects > 0 ? kpis.roadProjects : 65;
    const buildingTotal = kpis.buildingProjects > 0 ? kpis.buildingProjects : 52;
    const machineryTotal = kpis.machinery > 0 ? kpis.machinery : 44;

    const [generalContractors, buildingContractors, roadContractors, specialContractors] = allocate(contractorTotal, [0.34, 0.24, 0.22, 0.2]);
    const [generalConsultants, designConsultants, supervisionConsultants, specialConsultants] = allocate(consultantTotal, [0.38, 0.24, 0.2, 0.18]);
    const [asphalt, gravel, cobblestone, bridge] = allocate(roadTotal, [0.33, 0.18, 0.22, 0.27]);
    const [residential, commercial, publicBuilding, industrial] = allocate(buildingTotal, [0.36, 0.22, 0.26, 0.16]);
    const [compactors, rollers, asphaltPavers, asphaltMixers, conBatchPlants, concreteMixers, cranes, dozers, excavators, loaders] = allocate(
      machineryTotal,
      [0.08, 0.11, 0.1, 0.09, 0.08, 0.11, 0.1, 0.09, 0.13, 0.11]
    );

    return {
      contractors: [
        { key: 'general_contractors', label: 'General Contractors', value: generalContractors },
        { key: 'building_contractors', label: 'Building Contractors', value: buildingContractors },
        { key: 'road_contractors', label: 'Road Contractors', value: roadContractors },
        { key: 'special_contractors', label: 'Special Contractors', value: specialContractors }
      ],
      consultants: [
        { key: 'general_consultants', label: 'General Consultants', value: generalConsultants },
        { key: 'design_consultants', label: 'Design Consultants', value: designConsultants },
        { key: 'supervision_consultants', label: 'Supervision Consultants', value: supervisionConsultants },
        { key: 'special_consultants', label: 'Special Consultants', value: specialConsultants }
      ],
      roadProjects: [
        { key: 'asphalt', label: 'Asphalt', value: asphalt },
        { key: 'gravel', label: 'Gravel', value: gravel },
        { key: 'cobblestone', label: 'Cobblestone', value: cobblestone },
        { key: 'bridge', label: 'Bridge', value: bridge }
      ],
      buildingProjects: [
        { key: 'residential', label: 'Residential', value: residential },
        { key: 'commercial', label: 'Commercial', value: commercial },
        { key: 'public', label: 'Public', value: publicBuilding },
        { key: 'industrial', label: 'Industrial', value: industrial }
      ],
      machinery: [
        { key: 'compactor', label: 'Compactor', value: compactors },
        { key: 'roller', label: 'Roller', value: rollers },
        { key: 'asphalt_paver', label: 'Asphalt Paver', value: asphaltPavers },
        { key: 'asphalt_mixer', label: 'Asphalt Mixer', value: asphaltMixers },
        { key: 'con_batch_plant', label: 'Con/Batch Plant', value: conBatchPlants },
        { key: 'concrete_mixer', label: 'Concrete Mixer', value: concreteMixers },
        { key: 'crane', label: 'Crane', value: cranes },
        { key: 'dozer', label: 'Dozer', value: dozers },
        { key: 'excavator', label: 'Excavator', value: excavators },
        { key: 'loader', label: 'Loader', value: loaders }
      ]
    };
  }, [kpis.buildingProjects, kpis.consultants, kpis.contractors, kpis.machinery, kpis.roadProjects]);

  const dummySplitDetails = useMemo(() => {
    const seedToInt = (seed: string) => {
      let h = 2166136261;
      for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };

    const createRng = (seed: string) => {
      let state = seedToInt(seed) || 1;
      return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };
    };

    const allocateByWeights = (total: number, weights: number[]) => {
      const safeTotal = Math.max(0, Math.floor(total));
      const normalizedWeights = weights.map((w) => (Number.isFinite(w) ? Math.max(0, w) : 0));
      const sumWeights = normalizedWeights.reduce((a, b) => a + b, 0);
      if (!safeTotal || !sumWeights) return normalizedWeights.map(() => 0);
      const raw = normalizedWeights.map((w) => (safeTotal * w) / sumWeights);
      const floors = raw.map((v) => Math.floor(v));
      let remainder = safeTotal - floors.reduce((a, b) => a + b, 0);
      const order = raw
        .map((v, i) => ({ i, frac: v - Math.floor(v) }))
        .sort((a, b) => b.frac - a.frac)
        .map((x) => x.i);
      const result = [...floors];
      for (let k = 0; k < remainder; k += 1) result[order[k % order.length]] += 1;
      return result;
    };

    const distribute = (total: number, count: number, seed: string) => {
      const safeCount = Math.max(1, Math.floor(count));
      const rng = createRng(seed);
      const peak1 = rng() < 0.2 ? 0 : rng() > 0.8 ? safeCount - 1 : 1 + Math.floor(rng() * Math.max(1, safeCount - 2));
      const sigma1 = 0.9 + rng() * 1.4;
      const hasSecondPeak = rng() < 0.35 && safeCount > 3;
      const peak2 = hasSecondPeak ? Math.floor(rng() * safeCount) : peak1;
      const sigma2 = hasSecondPeak ? 0.8 + rng() * 1.2 : sigma1;

      const weights = Array.from({ length: safeCount }, (_, idx) => {
        const d1 = (idx - peak1) / sigma1;
        const base1 = Math.exp(-0.5 * d1 * d1);
        let combined = base1;
        if (hasSecondPeak) {
          const d2 = (idx - peak2) / sigma2;
          combined += 0.65 * Math.exp(-0.5 * d2 * d2);
        }
        const jitter = 0.75 + rng() * 0.55;
        return combined * jitter;
      });

      return allocateByWeights(total, weights);
    };

    const build = (items: { key: string; value: number }[], gradeCount: number) => {
      return items.reduce((acc, item) => {
        const values = distribute(item.value, gradeCount, item.key);
        acc[item.key] = values.map((value, idx) => ({ label: `Grade ${idx + 1}`, value }));
        return acc;
      }, {} as Record<string, { label: string; value: number }[]>);
    };

    return { contractors: build(dummySplit.contractors, 7), consultants: build(dummySplit.consultants, 5) };
  }, [dummySplit.contractors, dummySplit.consultants]);

  const {
    data: contractorsSplit,
    isLoading: isContractorsSplitLoading,
    isError: isContractorsSplitError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'contractors-split', selectedDepartmentId],
    queryFn: async () => {
      const response = await dashboardApiService.getContractorsSplit(cardParams);
      return parseSplitItems(response?.payload);
    },
    enabled: !useDummyData
  });

  const {
    data: consultantsSplit,
    isLoading: isConsultantsSplitLoading,
    isError: isConsultantsSplitError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'consultants-split', selectedDepartmentId],
    queryFn: async () => {
      const response = await dashboardApiService.getConsultantsSplit(cardParams);
      return parseSplitItems(response?.payload);
    },
    enabled: !useDummyData
  });

  const {
    data: roadProjectsSplit,
    isLoading: isRoadProjectsSplitLoading,
    isError: isRoadProjectsSplitError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'road-projects-split', selectedDepartmentId],
    queryFn: async () => {
      const response = await dashboardApiService.getRoadProjectsSplit(cardParams);
      return parseSplitItems(response?.payload);
    },
    enabled: !useDummyData
  });

  const {
    data: buildingProjectsSplit,
    isLoading: isBuildingProjectsSplitLoading,
    isError: isBuildingProjectsSplitError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'building-projects-split', selectedDepartmentId],
    queryFn: async () => {
      const response = await dashboardApiService.getBuildingProjectsSplit(cardParams);
      return parseSplitItems(response?.payload);
    },
    enabled: !useDummyData
  });

  const {
    data: machinerySplit,
    isLoading: isMachinerySplitLoading,
    isError: isMachinerySplitError
  } = useQuery({
    queryKey: ['dashboard', 'card', 'machinery-split', selectedDepartmentId],
    queryFn: async () => {
      const response = await dashboardApiService.getMachinerySplit(cardParams);
      return parseSplitItems(response?.payload);
    },
    enabled: !useDummyData
  });

  const parseSplitDetailPoints = (payload: any): SplitDetailPoint[] => {
    if (!Array.isArray(payload)) return [];
    return payload
      .map((item, idx) => {
        const label = String(item?.label || item?.name || item?.subcategory || `Item ${idx + 1}`);
        const value = safeNumber(item?.value);
        return { label, value };
      })
      .filter((x) => x.label);
  };

  const fetchContractorsSplitDetails = async (subcategoryId: string): Promise<SplitDetailPoint[]> => {
    const response = await dashboardApiService.getContractorsSplitDetails(subcategoryId, cardParams);
    return parseSplitDetailPoints(response?.payload);
  };

  const fetchConsultantsSplitDetails = async (subcategoryId: string): Promise<SplitDetailPoint[]> => {
    const response = await dashboardApiService.getConsultantsSplitDetails(subcategoryId, cardParams);
    return parseSplitDetailPoints(response?.payload);
  };

  const split = useMemo(() => {
    if (useDummyData) return dummySplit;
    return {
      contractors: contractorsSplit || [],
      consultants: consultantsSplit || [],
      roadProjects: roadProjectsSplit || [],
      buildingProjects: buildingProjectsSplit || [],
      machinery: machinerySplit || []
    };
  }, [buildingProjectsSplit, consultantsSplit, contractorsSplit, dummySplit, machinerySplit, roadProjectsSplit, useDummyData]);

  return {
    useDummyData,
    handleToggleDummyData,
    departments,
    selectedDepartmentId,
    handleDepartmentChange,
    isDashboardLoading: useDummyData || isDepartmentLoading,
    isDashboardError: false,
    isDepartmentLoading,
    departmentName,
    summary: {
      ...summary,
      stakeholder: resolvedStakeholder.stakeholder,
      project: resolvedProject.project,
      resource: resolvedResource.resource,
      document: resolvedStakeholder.document
    },
    totals,
    kpis,
    split,
    splitDetails: useDummyData ? dummySplitDetails : undefined,
    fetchContractorsSplitDetails,
    fetchConsultantsSplitDetails,
    loading: {
      stakeholders: isStakeholderLoading,
      projects: isProjectLoading,
      resources: isResourceLoading,
      kpiContractors: isContractorsKpiLoading,
      kpiConsultants: isConsultantsKpiLoading,
      kpiRoadProjects: isRoadProjectsKpiLoading,
      kpiBuildingProjects: isBuildingProjectsKpiLoading,
      kpiMachinery: isMachineryKpiLoading,
      splitContractors: isContractorsSplitLoading,
      splitConsultants: isConsultantsSplitLoading,
      splitRoadProjects: isRoadProjectsSplitLoading,
      splitBuildingProjects: isBuildingProjectsSplitLoading,
      splitMachinery: isMachinerySplitLoading
    },
    error: {
      stakeholders: isStakeholderError,
      projects: isProjectError,
      resources: isResourceError,
      kpiContractors: isContractorsKpiError,
      kpiConsultants: isConsultantsKpiError,
      kpiRoadProjects: isRoadProjectsKpiError,
      kpiBuildingProjects: isBuildingProjectsKpiError,
      kpiMachinery: isMachineryKpiError,
      splitContractors: isContractorsSplitError,
      splitConsultants: isConsultantsSplitError,
      splitRoadProjects: isRoadProjectsSplitError,
      splitBuildingProjects: isBuildingProjectsSplitError,
      splitMachinery: isMachinerySplitError
    }
  };
};
