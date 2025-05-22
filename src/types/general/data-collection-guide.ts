export interface DataCollectionGuide {
    id: string;
    model: string;
    title: string;
    description?: string;
    instruction?: string;
    data_collection_frequency?: string;
    data_source?: string;
    responsible_data_collector_body?: string;
}
export default DataCollectionGuide;