import {NextRequest} from "next/server";

export function getJournalQueryParams(request: NextRequest) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search);
    const pageSize = searchParams.get('pageSize');
    const pageNumber = searchParams.get('pageNumber');
    const orderBy = searchParams.get('orderBy');
    const searchTerm = searchParams.get('searchTerm') ?? '';
    const periodFrom = searchParams.get('periodFrom') ?? '';
    const periodTo = searchParams.get('periodTo') ?? '';
    const fetch = searchParams.get('fetch') ?? '';

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