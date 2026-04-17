import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service'
import { MasterCategory, MasterSubCategory, MasterType } from 'src/types/master/master-types'
import useLocalStorage from 'src/hooks/use-local-storage'
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants'

interface UseModelTypeCategoryReturn {
    types: MasterType[]
    categories: MasterCategory[]
    subCategories: MasterSubCategory[]
    activeType: MasterType
    setActiveType: (type: MasterType) => void
    activeCategory: MasterCategory
    setActiveCategory: (category: MasterCategory) => void
    activeSubCategory: MasterSubCategory
    setActiveSubCategory: (subCategory: MasterSubCategory) => void
    isTypeLoading: boolean
    isCategoryLoading: boolean
    isSubCategoryLoading: boolean
}

const toSlug = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

const nowIso = () => new Date().toISOString()

const makeDummyType = (title: string): MasterType => ({
    id: `dummy-type-${toSlug(title)}`,
    title,
    description: '',
    file_id: null,
    parent_id: null,
    revision_no: null,
    flag: null,
    created_at: nowIso(),
    updated_at: nowIso()
})

const makeDummyCategory = (typeTitle: string, title: string): MasterCategory => ({
    id: `dummy-cat-${toSlug(typeTitle)}-${toSlug(title)}`,
    title,
    description: '',
    created_at: nowIso(),
    updated_at: nowIso()
})

const makeDummySubCategory = (categoryId: string, title: string): MasterSubCategory => ({
    id: `dummy-sub-${toSlug(categoryId)}-${toSlug(title)}`,
    title,
    description: '',
    created_at: nowIso(),
    updated_at: nowIso()
})

const DUMMY_PROJECT_INFRA_TYPES: MasterType[] = [
    makeDummyType('Air field / Air port'),
    makeDummyType('Building'),
    makeDummyType('Electric'),
    makeDummyType('Railway'),
    makeDummyType('Road'),
    makeDummyType('Telecommunication'),
    makeDummyType('Water Infrastructure')
]

const DUMMY_STAKEHOLDER_TYPES: MasterType[] = [
    makeDummyType('Associations'),
    makeDummyType('Consultants'),
    makeDummyType('Contractor'),
    makeDummyType('Education Institutions'),
    makeDummyType('MSMEs'),
    makeDummyType('Others'),
    makeDummyType('Real estate developer'),
    makeDummyType('Regulatory Body')
]

const getDummyTypesForModel = (model: string) => {
    if (model === 'stakeholder') return DUMMY_STAKEHOLDER_TYPES
    if (model === 'project' || model === 'infrastructure') return DUMMY_PROJECT_INFRA_TYPES
    return DUMMY_PROJECT_INFRA_TYPES
}

const getDummyCategoryTitles = (typeTitle: string) => {
    const key = typeTitle.toLowerCase()
    if (key.includes('road')) return ['Gravel Road', 'Asphalt Road', 'Asphalt Concrete Road', 'Reed Road']
    if (key.includes('water')) return ['Water Supply', 'Wastewater', 'Irrigation', 'Drainage']
    if (key.includes('electric')) return ['Generation', 'Transmission', 'Distribution', 'Electrification']
    if (key.includes('tele')) return ['Backbone Network', 'Mobile Coverage', 'Broadband', 'Digital Services']
    if (key.includes('rail')) return ['Track Works', 'Stations', 'Signaling', 'Rolling Stock']
    if (key.includes('building')) return ['Public Buildings', 'Residential', 'Commercial', 'Industrial']
    if (key.includes('air')) return ['Runway & Airside', 'Terminal Facilities', 'Navigation', 'Support Services']
    if (key.includes('association'))
        return ['Business Association', 'Professional Association', 'Special Interest Association', 'Trade Association']
    if (key.includes('consultant'))
        return ['Engineering Consulting', 'Financial Consulting', 'Management Consulting', 'ICT Consulting']
    if (key.includes('contractor'))
        return ['General Contractor', 'Specialized Contractor', 'Maintenance Contractor', 'Supply & Installation']
    if (key.includes('education'))
        return ['Universities', 'TVET', 'Colleges', 'Schools']
    if (key.includes('msme'))
        return ['Manufacturing', 'Services', 'Trade', 'Construction']
    if (key.includes('real estate') || key.includes('developer'))
        return ['Housing Development', 'Commercial Development', 'Land Development', 'Property Services']
    if (key.includes('regulatory'))
        return ['Licensing', 'Compliance', 'Standards', 'Monitoring']
    if (key.includes('other'))
        return ['Individuals', 'Private Sector', 'Public Sector', 'NGOs']
    return ['Category 1', 'Category 2', 'Category 3', 'Category 4']
}

const getDummySubCategoryTitles = (typeTitle: string, categoryTitle: string) => {
    const t = typeTitle.toLowerCase()
    const c = categoryTitle.toLowerCase()

    if (t.includes('road')) {
        if (c.includes('gravel')) return ['New Construction', 'Rehabilitation', 'Routine Maintenance', 'Upgrading']
        if (c.includes('asphalt concrete')) return ['New Construction', 'Overlay Works', 'Rehabilitation', 'Drainage Improvement']
        if (c.includes('asphalt')) return ['New Construction', 'Rehabilitation', 'Periodic Maintenance', 'Safety Improvement']
        return ['New Construction', 'Rehabilitation', 'Routine Maintenance', 'Spot Improvement']
    }

    if (t.includes('water')) {
        if (c.includes('supply')) return ['Urban Water Supply', 'Rural Water Supply', 'Treatment Plants', 'Distribution Network']
        if (c.includes('waste')) return ['Collection Network', 'Treatment Facility', 'Pumping Stations', 'Reuse & Recycling']
        if (c.includes('irrig')) return ['Canals', 'Small Dams', 'Modern Irrigation', 'Rehabilitation']
        return ['Urban Drainage', 'Flood Control', 'Culverts & Crossings', 'Maintenance']
    }

    if (t.includes('electric')) {
        if (c.includes('generation')) return ['Hydropower', 'Solar', 'Wind', 'Thermal']
        if (c.includes('transmission')) return ['Transmission Lines', 'Substations', 'Upgrading', 'Protection Systems']
        if (c.includes('distribution')) return ['Distribution Lines', 'Transformers', 'Metering', 'Rehabilitation']
        return ['Rural Electrification', 'Grid Extension', 'Mini-Grid', 'Standalone Systems']
    }

    if (t.includes('tele')) {
        if (c.includes('backbone')) return ['Fiber Rollout', 'Upgrading', 'Microwave Links', 'Core Network']
        if (c.includes('mobile')) return ['4G Expansion', '5G Pilot', 'Rural Coverage', 'New Sites']
        if (c.includes('broadband')) return ['FTTH', 'Enterprise Links', 'ISP Enablement', 'Capacity Upgrade']
        return ['e-Government', 'Digital Payments', 'Digital Health', 'Digital Education']
    }

    if (t.includes('rail')) {
        if (c.includes('track')) return ['New Line Construction', 'Rehabilitation', 'Maintenance', 'Upgrading']
        if (c.includes('station')) return ['New Stations', 'Upgrading', 'Accessibility', 'Safety Systems']
        if (c.includes('signal')) return ['Installation', 'Upgrade', 'Communication', 'Control Center']
        return ['Locomotives', 'Passenger Coaches', 'Freight Wagons', 'Maintenance Facility']
    }

    if (t.includes('building')) {
        if (c.includes('public')) return ['Schools', 'Hospitals', 'Administrative', 'Other Public']
        if (c.includes('residential')) return ['Affordable Housing', 'Condominiums', 'Rehabilitation', 'New Construction']
        if (c.includes('commercial')) return ['Markets', 'Office Buildings', 'Hotels', 'Malls']
        return ['Sheds & Warehouses', 'Factories', 'Industrial Parks', 'Rehabilitation']
    }

    if (t.includes('air')) {
        if (c.includes('runway')) return ['New Runway', 'Rehabilitation', 'Airfield Lighting', 'Taxiways']
        if (c.includes('terminal')) return ['Terminal Expansion', 'Renovation', 'Baggage Systems', 'Security Systems']
        if (c.includes('navigation')) return ['Radar', 'Communication', 'Meteorology', 'Upgrading']
        return ['Fire & Rescue', 'Fuel Systems', 'Cargo Facilities', 'Maintenance']
    }

    if (t.includes('association')) {
        if (c.includes('business')) return ['Chamber of Commerce', 'Sector Association', 'Cooperative Union', 'Trade Federation']
        if (c.includes('professional')) return ['Engineering Association', 'Legal Association', 'Accounting Association', 'Medical Association']
        if (c.includes('special')) return ['Women Association', 'Youth Association', 'Disability Association', 'Environmental Association']
        return ['Importers', 'Exporters', 'Manufacturers', 'Service Providers']
    }

    if (t.includes('consultant')) {
        if (c.includes('engineering')) return ['Design', 'Supervision', 'Quality Control', 'Geotechnical']
        if (c.includes('financial')) return ['Audit', 'Advisory', 'Feasibility Study', 'Procurement Support']
        if (c.includes('management')) return ['Strategy', 'PMO Support', 'Change Management', 'Process Improvement']
        return ['Architecture', 'Implementation', 'Security', 'Data & Analytics']
    }

    if (t.includes('contractor')) {
        if (c.includes('general')) return ['Building Works', 'Road Works', 'Water Works', 'Electrical Works']
        if (c.includes('specialized')) return ['Mechanical', 'Electrical', 'Finishing', 'Structural']
        if (c.includes('maintenance')) return ['Road Maintenance', 'Building Maintenance', 'Water Systems', 'Power Systems']
        return ['Equipment Supply', 'Materials Supply', 'Installation', 'Commissioning']
    }

    if (t.includes('education')) {
        if (c.includes('univers')) return ['Public Universities', 'Private Universities', 'Research Institutes', 'Extension Programs']
        if (c.includes('tvet')) return ['Public TVET', 'Private TVET', 'Training Centers', 'Apprenticeship']
        if (c.includes('college')) return ['Health Colleges', 'Business Colleges', 'ICT Colleges', 'Engineering Colleges']
        return ['Primary Schools', 'Secondary Schools', 'Preparatory Schools', 'Special Needs Schools']
    }

    if (t.includes('msme')) {
        if (c.includes('manufact')) return ['Food Processing', 'Textile & Garment', 'Metal Works', 'Wood Works']
        if (c.includes('service')) return ['Transport', 'ICT Services', 'Maintenance', 'Hospitality']
        if (c.includes('trade')) return ['Retail', 'Wholesale', 'Import', 'Export']
        return ['Materials Supply', 'Labor Services', 'Finishing', 'Civil Works']
    }

    if (t.includes('real estate') || t.includes('developer')) {
        if (c.includes('housing')) return ['Affordable Housing', 'Condominiums', 'Apartments', 'Residential Estates']
        if (c.includes('commercial')) return ['Malls', 'Office Buildings', 'Hotels', 'Mixed-Use']
        if (c.includes('land')) return ['Serviced Plots', 'Industrial Land', 'Infrastructure Works', 'Planning & Survey']
        return ['Property Management', 'Sales & Marketing', 'Valuation', 'Leasing']
    }

    if (t.includes('regulatory')) {
        if (c.includes('licens')) return ['New Licenses', 'Renewals', 'Suspensions', 'Revocations']
        if (c.includes('compliance')) return ['Audits', 'Inspections', 'Corrective Actions', 'Penalties']
        if (c.includes('standard')) return ['Issuance', 'Updates', 'Training', 'Guidance']
        return ['Reporting', 'Review', 'Risk Assessment', 'Enforcement']
    }

    if (t.includes('other')) {
        if (c.includes('individual')) return ['Local', 'International', 'Partners', 'Donors']
        if (c.includes('private')) return ['SMEs', 'Large Companies', 'Startups', 'Investors']
        if (c.includes('public')) return ['Federal', 'Regional', 'City Admin', 'Woreda']
        return ['Local NGOs', 'International NGOs', 'Community Based', 'Faith Based']
    }

    return ['Subcategory 1', 'Subcategory 2', 'Subcategory 3', 'Subcategory 4']
}

const useModelTypeCategory = (model: string): UseModelTypeCategoryReturn => {
    const [types, setTypes] = useState<MasterType[]>([])
    const [categories, setCategories] = useState<MasterCategory[]>([])
    const [subCategories, setSubCategories] = useState<MasterSubCategory[]>([])
    const [activeType, setActiveType] = useState<MasterType>({} as MasterType)
    const [activeCategory, setActiveCategory] = useState<MasterCategory>({} as MasterCategory)
    const [activeSubCategory, setActiveSubCategory] = useState<MasterSubCategory>({} as MasterSubCategory)
    const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false)

    // Fetch model types
    const { data: fetchedTypes, isLoading: isTypeLoading } = useQuery({
        queryKey: ['masterType', model],
        queryFn: () => masterTypeApiService.getAll(model, {}),
        enabled: !dummyEnabled
    })

    // Fetch categories for selected type
    const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['masterCategory', model, activeType?.id],
        queryFn: () =>
            masterCategoryApiService.getAll(model, {
                filter: { [`${model}type_id`]: activeType?.id },
            }),
        enabled: !!activeType?.id && !dummyEnabled,
    })

    // Fetch subcategories for selected category
    const { data: fetchedSubCategories, isLoading: isSubCategoryLoading } = useQuery({
        queryKey: ['masterSubCategory', model, activeCategory?.id],
        queryFn: () =>
            masterSubCategoryApiService.getAll(model, {
                filter: { [`${model}category_id`]: activeCategory?.id },
            }),
        enabled: !!activeCategory?.id && !dummyEnabled,
    })

    // Map fetched types
    useEffect(() => {
        if (dummyEnabled) return
        if (!fetchedTypes?.payload?.length) return
        setTypes(fetchedTypes.payload)
        if (!activeType?.id) setActiveType(fetchedTypes.payload[0])
    }, [fetchedTypes])

    // Map fetched categories
    useEffect(() => {
        if (dummyEnabled) return
        if (!fetchedCategories?.payload?.length) {
            setCategories([])
            setActiveCategory({} as MasterCategory)
            return
        }
        setCategories(fetchedCategories.payload)
        if (!activeCategory?.id) setActiveCategory(fetchedCategories.payload[0])
    }, [fetchedCategories])

    // Map fetched subcategories
    useEffect(() => {
        if (dummyEnabled) return
        if (!fetchedSubCategories?.payload?.length) {
            setSubCategories([])
            setActiveSubCategory({} as MasterSubCategory)
            return
        }
        setSubCategories(fetchedSubCategories.payload)
        if (!activeSubCategory?.id) setActiveSubCategory(fetchedSubCategories.payload[0])
    }, [fetchedSubCategories])

    useEffect(() => {
        if (!dummyEnabled) return
        const dummyTypes = getDummyTypesForModel(model)
        setTypes(dummyTypes)
        setActiveType((current) => dummyTypes.find((t) => t.id === current?.id) ?? dummyTypes[0])
    }, [dummyEnabled, model])

    useEffect(() => {
        if (!dummyEnabled) return
        const dummyTypes = getDummyTypesForModel(model)
        const typeTitle = activeType?.title || dummyTypes[0].title
        const dummyCategories = getDummyCategoryTitles(typeTitle).map((title) => makeDummyCategory(typeTitle, title))
        setCategories(dummyCategories)
        setActiveCategory((current) => dummyCategories.find((c) => c.id === current?.id) ?? dummyCategories[0])
    }, [dummyEnabled, model, activeType?.id])

    useEffect(() => {
        if (!dummyEnabled) return
        const dummyTypes = getDummyTypesForModel(model)
        const typeTitle = activeType?.title || dummyTypes[0].title
        const categoryTitle = activeCategory?.title || getDummyCategoryTitles(typeTitle)[0]
        const subs = getDummySubCategoryTitles(typeTitle, categoryTitle).map((title) =>
            makeDummySubCategory(activeCategory?.id || `dummy-cat-${toSlug(typeTitle)}-${toSlug(categoryTitle)}`, title)
        )
        setSubCategories(subs)
        setActiveSubCategory((current) => subs.find((s) => s.id === current?.id) ?? subs[0])
    }, [dummyEnabled, model, activeCategory?.id])

    return {
        types,
        categories,
        subCategories,
        activeType,
        setActiveType,
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory,
        isTypeLoading,
        isCategoryLoading,
        isSubCategoryLoading,
    }
}

export default useModelTypeCategory
