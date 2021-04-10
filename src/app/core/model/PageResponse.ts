export interface PageResponse<T> {
    page: number;
    pageSize: number;
    totalCount: number;
    result: T[];
}
