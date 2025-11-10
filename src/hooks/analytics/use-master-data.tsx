import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import { MasterCategory, MasterType } from 'src/types/master/master-types'

interface UseProjectTypeCategoryReturn {
    types: MasterType[]
    categories: MasterCategory[]
    activeType: MasterType
    setActiveType: (type: MasterType) => void
    activeCategory: MasterCategory
    setActiveCategory: (category: MasterCategory) => void
    isCategoryLoading: boolean
}

const useProjectTypeCategory = (): UseProjectTypeCategoryReturn => {
    const [types, setTypes] = useState<MasterType[]>([])
    const [categories, setCategories] = useState<MasterCategory[]>([])
    const [activeType, setActiveType] = useState<MasterType>({} as MasterType)
    const [activeCategory, setActiveCategory] = useState<MasterCategory>({} as MasterCategory)

    // Fetch project types
    const { data: fetchedTypes } = useQuery({
        queryKey: ['masterType', 'project'],
        queryFn: () => masterTypeApiService.getAll('project', {})
    })

    // Fetch categories for selected type
    const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['masterCategory', 'project', activeType?.id],
        queryFn: () =>
            masterCategoryApiService.getAll('project', {
                filter: { projecttype_id: activeType?.id }
            }),
        enabled: !!activeType?.id
    })

    // Map types after fetching
    useEffect(() => {
        if (!fetchedTypes?.payload?.length) return
        setTypes(fetchedTypes.payload)
        if (!activeType?.id) setActiveType(fetchedTypes.payload[0])
    }, [fetchedTypes])

    // Map categories after fetching
    useEffect(() => {
        if (!fetchedCategories?.payload?.length) {
            setCategories([])
            setActiveCategory({} as MasterCategory)
            return
        }
        setCategories(fetchedCategories.payload)
        if (!activeCategory?.id) setActiveCategory(fetchedCategories.payload[0])
    }, [fetchedCategories])

    return {
        types,
        categories,
        activeType,
        setActiveType,
        activeCategory,
        setActiveCategory,
        isCategoryLoading
    }
}

export default useProjectTypeCategory
