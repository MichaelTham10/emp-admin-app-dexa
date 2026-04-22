export interface PerPageObj {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}

export interface ResponsePagination<T> {
    data: T
    perPage: PerPageObj
} 