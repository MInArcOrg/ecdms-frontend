import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service'
import { MasterCategory, MasterSubCategory, MasterType } from 'src/types/master/master-types'

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

const useModelTypeCategory = (model: string): UseModelTypeCategoryReturn => {
    const [types, setTypes] = useState<MasterType[]>([])
    const [categories, setCategories] = useState<MasterCategory[]>([])
    const [subCategories, setSubCategories] = useState<MasterSubCategory[]>([])
    const [activeType, setActiveType] = useState<MasterType>({} as MasterType)
    const [activeCategory, setActiveCategory] = useState<MasterCategory>({} as MasterCategory)
    const [activeSubCategory, setActiveSubCategory] = useState<MasterSubCategory>({} as MasterSubCategory)

    // Fetch model types
    const { data: fetchedTypes, isLoading: isTypeLoading } = useQuery({
        queryKey: ['masterType', model],
        queryFn: () => masterTypeApiService.getAll(model, {}),
    })

    // Fetch categories for selected type
    const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['masterCategory', model, activeType?.id],
        queryFn: () =>
            masterCategoryApiService.getAll(model, {
                filter: { [`${model}type_id`]: activeType?.id },
            }),
        enabled: !!activeType?.id,
    })

    // Fetch subcategories for selected category
    const { data: fetchedSubCategories, isLoading: isSubCategoryLoading } = useQuery({
        queryKey: ['masterSubCategory', model, activeCategory?.id],
        queryFn: () =>
            masterSubCategoryApiService.getAll(model, {
                filter: { [`${model}category_id`]: activeCategory?.id },
            }),
        enabled: !!activeCategory?.id,
    })

    // Map fetched types
    useEffect(() => {
        if (!fetchedTypes?.payload?.length) return
        setTypes(fetchedTypes.payload)
        if (!activeType?.id) setActiveType(fetchedTypes.payload[0])
    }, [fetchedTypes])

    // Map fetched categories
    useEffect(() => {
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
        if (!fetchedSubCategories?.payload?.length) {
            setSubCategories([])
            setActiveSubCategory({} as MasterSubCategory)
            return
        }
        setSubCategories(fetchedSubCategories.payload)
        if (!activeSubCategory?.id) setActiveSubCategory(fetchedSubCategories.payload[0])
    }, [fetchedSubCategories])

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
