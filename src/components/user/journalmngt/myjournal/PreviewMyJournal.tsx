import React from 'react';
import { JournalEntryResponse } from '@/boundary/interfaces/journal';
import ReactPDF, { Document, Page, PDFViewer, Text, View } from '@react-pdf/renderer';
import { PdfPreviewStyle, toTitleCase } from '@/lib/utils/pdfUtils';
import { formatDateWithTime } from '@/helpers/dateHelpers';
import RenderMoodTagsWithColors from '@/components/user/journalmngt/journalentries/RenderMoodTagsWithColors';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/boundary/interfaces/user';
import RenderPdfGridImages from '@/components/user/journalmngt/journalentries/RenderPdfGridImages';
import Font = ReactPDF.Font;

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
const styles = PdfPreviewStyle();

export function getDocument(journalTitle: string, user: User | null, journalEntries: JournalEntryResponse[]) {
  return <Document style={styles.document}>
    <Page size='A4' orientation={'portrait'} style={styles.body} wrap>
      <Text style={styles.header} fixed>
        ~ Made with love for pet lovers ~
      </Text>
      <Text style={styles.title}>{toTitleCase(journalTitle)}</Text>
      <Text style={{ textAlign: 'center' }}>{user?.username}</Text>
    </Page>
    {journalEntries.map((journalEntry) => (
      <Page key={journalEntry.id} size='A4' orientation={'portrait'} style={styles.body} wrap>
        <Text style={styles.header} fixed>
          ~ Made with love for pet lovers ~
        </Text>
        <Text style={styles.subtitle}>{toTitleCase(journalEntry.title)}</Text>
        <Text
          style={styles.author}>{formatDateWithTime(journalEntry.createdAt)}</Text>

        <Text style={styles.moodtags}>
          {RenderMoodTagsWithColors(journalEntry.mood.split(',').map(item => item.trim()))}
          {RenderMoodTagsWithColors(journalEntry.tags.split(',').map(item => item.trim()))}
        </Text>

        <View>
          <Text style={styles.content}>
            {journalEntry.content}
          </Text>
          <RenderPdfGridImages imageBuffers={journalEntry.journalAttachments.map((attachment) => {
            return attachment.buffer;
          })} />
        </View>
      </Page>
    ))}
  </Document>;
}

export default function PreviewMyJournal({ journalEntries, journalTitle }: {
  journalEntries: JournalEntryResponse[],
  journalTitle: string
}) {
  const { user } = useAuth();

  return (
    <>
      <div className='grid grid-cols-1 gap-4 mt-4'>
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
          {getDocument(journalTitle, user, journalEntries)}
        </PDFViewer>
      </div>
    </>
  );
}

