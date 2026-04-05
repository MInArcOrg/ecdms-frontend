import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { defaultGetRequestParam, ExportParam, GetRequestParam, IApiResponse } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';
import { StringHelpers } from 'src/utils/string-helpers';
import { ExportConfigValues } from 'src/views/shared/listing/export';

interface UsePaginatedFetchProps<T> {
    queryKey: string[];
    fetchFunction: (params: GetRequestParam) => Promise<IApiResponse<T>>;
    exportApiCall?: (params: GetRequestParam) => Promise<Blob>;
    initialQueryParams?: GetRequestParam;
}

const usePaginatedFetch = <T,>({ queryKey, fetchFunction, exportApiCall, initialQueryParams = defaultGetRequestParam }: UsePaginatedFetchProps<T>) => {
    const queryClient = useQueryClient();
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        pageSize: 10,
        total: 0,
        lastPage: 1
    });
    const [queryParams, setQueryParams] = useState<GetRequestParam>({ ...initialQueryParams });

    const invalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
    };

    const handleSearch = (searchTerm: string, searchKeys: string[]) => {
        setQueryParams((prevParams: GetRequestParam): GetRequestParam => ({
            ...prevParams,
            filter: {
                ...prevParams.filter,
                ...StringHelpers.createSearchFilter(searchTerm, searchKeys)
            },
            pagination: {
                ...prevParams.pagination,
                page: 1,
                pageSize: prevParams?.pagination?.pageSize || 0
            }
        }));
    };

    const handleFilter = (filterValues: Record<string, any>) => {
        const cleanedFilterValues = StringHelpers.cleanObject(filterValues);
        setQueryParams((prevParams: GetRequestParam): GetRequestParam => ({
            ...prevParams,
            filter: cleanedFilterValues
        }));
    };
    const handleExport = async (exportConfig: { export: ExportConfigValues }): Promise<void> => {
        if (!exportApiCall) {
            console.warn('Export API call is not provided. Skipping export.');
            return;
        }
        // Use the actual export configuration (assuming the caller component wraps it)
        const actualExportConfig = exportConfig.export;
        const format = actualExportConfig.format; // e.g., 'xlsx' or 'csv'
        const downloadExtension = String(format).toLowerCase() === 'excel' ? 'xlsx' : String(format);

        // 1. Construct the ExportParam
        const exportParam: ExportParam = {
            format: format,
            fields: actualExportConfig.fields,
            currentPageOnly: actualExportConfig.currentPageOnly
        };

        // 2. Construct the final request parameters
        const exportQueryParams: GetRequestParam = {
            ...queryParams,
            pagination: actualExportConfig.currentPageOnly ? queryParams.pagination : null,
            export: exportParam
        };

        try {
            // 3. Execute the dedicated export API call
            // This function (exportApiCall) must be configured in the parent component
            // to call the export endpoint and set responseType: 'blob'.
            const fileBlob = await exportApiCall(exportQueryParams);

            // 4. Create a temporary link and trigger the download (Browser magic!)
            const url = window.URL.createObjectURL(fileBlob);
            const link = document.createElement('a');
            link.href = url;

            // NOTE: Since Blob/Axios usually don't give direct header access here, 
            // we use a simple default name. If using fetch, you'd extract the filename 
            // from the Content-Disposition header (like in the helper function above).
            const defaultFilename = `export_data.${downloadExtension}`;

            link.setAttribute('download', defaultFilename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Export failed during API call or download:', error);
            // Optionally show a toast notification here
            throw error;
        }
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: [queryKey, queryParams],
        queryFn: () =>
            fetchFunction({ ...defaultGetRequestParam, ...queryParams }).then((response) => {
                setPagination(response._attributes.pagination);
                return response.payload;
            }),
        // Add this to prevent automatic refetching when queryParams changes
        enabled: true
    });

    const handlePageChange = (pageSize: number, newPage: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            pagination: {
                ...prevParams.pagination,
                page: newPage,
                pageSize: pageSize
            }
        }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setQueryParams((prevParams) => ({
            ...prevParams,
            pagination: {
                page: 1,
                pageSize: newPageSize,
                total: pagination.total,
                lastPage: pagination.lastPage
            }
        }));
    };

    // Remove this useEffect as it's causing duplicate requests
    // useEffect(() => {
    //     refetch();
    // }, [queryParams]);

    return {
        data,
        isLoading,
        error,
        refetch,
        pagination,
        handlePageChange,
        handlePageSizeChange,
        invalidateQuery,
        handleSearch,
        handleFilter,
        handleExport
    };
};

export default usePaginatedFetch;
