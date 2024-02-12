import { JournalEntryResponse } from '@/boundary/interfaces/journal';

export interface CreateMagicProjectRequest {
  title: string;
  pdf_content: string;
  periodFrom: string;
  periodTo: string;
}

export type SavePdfRequest = {
  projectId: number;
  pdfContent: string;
}

export type PdfContent = {
  textColor: string;
  textFontFamily: string;
  textFontWeight: number;
  backgroundColor: string;
}

export interface MagicStudioProjectResponse {
  id: number;
  userId: number;
  slug: string;
  title: string;
  pdfContent: string;
  periodFrom: string;
  periodTo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailsResponse {
  project: MagicStudioProjectResponse,
  projectEntries: JournalEntryResponse[]
}