import {NextRequest} from "next/server";

export function getJournalQueryParams(searchParams: any) {
    const pageSize = searchParams.pageSize;
    const pageNumber = searchParams.pageNumber;
    const orderBy = searchParams.orderBy;
    const searchTerm = searchParams.searchTerm ?? '';
    const periodFrom = searchParams.periodFrom ?? '';
    const periodTo = searchParams.periodTo ?? '';
    const fetch = searchParams.fetch ?? '';

    return {pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo, fetch};
}

export function getUserQueryParams(request: NextRequest) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search);
    const pageSize = searchParams.get('pageSize');
    const pageNumber = searchParams.get('pageNumber');
    const orderBy = searchParams.get('orderBy');
    const searchTerm = searchParams.get('searchTerm');

    return {pageSize, pageNumber, orderBy, searchTerm};
}