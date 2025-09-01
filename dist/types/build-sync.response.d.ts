export interface BuildSyncResponse<T> {
    ok: boolean;
    status: Response['status'];
    data: T;
}
