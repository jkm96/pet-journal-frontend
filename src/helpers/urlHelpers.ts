import { JournalQueryParameters } from '@/boundary/parameters/journalQueryParameters';
import { SiteContentQueryParameters } from '@/boundary/parameters/contentQueryParameters';
import { MagicStudioQueryParameters } from '@/boundary/parameters/magicStudioQueryParameters';

export function getJournalQueryParams(searchParams: JournalQueryParameters) {
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';
  const periodFrom = searchParams.periodFrom ?? '';
  const periodTo = searchParams.periodTo ?? '';
  const fetch = searchParams.fetch ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo, fetch };
}

export function getContentQueryParams(searchParams: SiteContentQueryParameters) {
  const type = searchParams.type ?? '';

  return { type };
}

export function getMagicStudioQueryParams(searchParams: MagicStudioQueryParameters) {
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';
  const periodFrom = searchParams.periodFrom ?? '';
  const periodTo = searchParams.periodTo ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm, periodFrom, periodTo };
}

export function getUserQueryParams(queryParams: string) {
  const searchParams = JSON.parse(queryParams);
  const pageSize = searchParams.pageSize;
  const pageNumber = searchParams.pageNumber;
  const orderBy = searchParams.orderBy;
  const searchTerm = searchParams.searchTerm ?? '';

  return { pageSize, pageNumber, orderBy, searchTerm };
}