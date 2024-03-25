import React from 'react';
import { Chip } from '@nextui-org/react';
import { formatDateWithTime } from '@/helpers/dateHelpers';
import { getMoodColorClassList } from '@/helpers/stylingHelpers';
import { toTitleCase } from '@/lib/utils/pdfUtils';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';

interface RenderJournalHeaderProps {
  title: string;
  createdAt: string;
  mood: string;
  tags: string;
  pets: string[];
  showChips?: boolean;
  textColor?: string;
  textFontFamily?: string;
  textFontWeight?: number;
  diarySlug?: string;
}

const renderListWithColors = (data: string, showChips: boolean, textFontFamily?: string, textFontWeight?: number) => {
  const dataArray = data.split(',').map((item) => item.trim());
  const colorArray = getMoodColorClassList(dataArray);

  return (
    <>
      <div className='flex'>
        {dataArray.map((item, index) => (
          showChips ? (
            <Chip
              key={item}
              variant='solid'
              color={colorArray[index]}
              className={`font-bold text-tiny mr-1 ${colorArray[index]}`}
            >
              {item}
            </Chip>
          ) : (
            <span key={item}
                  style={{ fontFamily: textFontFamily, fontWeight: textFontWeight }}
                  color={colorArray[index]}
                  className={`text-tiny mr-1 text-${colorArray[index]}`}>
            {item}
          </span>
          )
        ))}
      </div>
    </>
  );
};

const RenderJournalHeader: React.FC<RenderJournalHeaderProps> = (
  {
    title,
    createdAt,
    mood,
    tags,
    pets,
    showChips = true,
    textColor,
    textFontFamily,
    textFontWeight,
    diarySlug,
  },
) => {
  return (
    <div className='pb-0 pt-2 px-4 flex-col items-start'>
      <p className='font-bold text-xl'
         style={{ color: textColor, fontFamily: textFontFamily, fontWeight: textFontWeight }}>
        <Link href={`${NAVIGATION_LINKS.DIARY_ENTRIES}/${diarySlug}`}>{toTitleCase(title)}</Link>
      </p>
      <small className='text-default-500' style={{ fontFamily: textFontFamily }}>
        {formatDateWithTime(createdAt)}
      </small>
      <div className='flex flex-col mt-1'>
        {renderListWithColors(
          mood,
          showChips,
          textFontFamily,
          textFontWeight)}
      </div>
      <div className='flex flex-col mt-2'>
        {renderListWithColors(
          tags,
          showChips,
          textFontFamily,
          textFontWeight)}
      </div>
    </div>
  );
};

export default RenderJournalHeader;
