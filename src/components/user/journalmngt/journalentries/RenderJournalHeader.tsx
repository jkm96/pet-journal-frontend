import React from 'react';
import { Chip } from '@nextui-org/react';
import { formatDate } from '@/helpers/dateHelpers';
import { getMoodColorClassList } from '@/helpers/stylingHelpers';
import { toTitleCase } from '@/lib/utils/pdfUtils';

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
              className={`font-bold text-medium ${colorArray[index]}`}
            >
              {item}
            </Chip>
          ) : (
            <span key={item}
                  style={{ fontFamily: textFontFamily, fontWeight: textFontWeight }}
                  color={colorArray[index]}
                  className={`text-medium mr-1 text-${colorArray[index]}`}>
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
  },
) => {
  return (
    <div className='pb-0 pt-2 px-4 flex-col items-start'>
      <p className='text-tiny font-bold'
         style={{ color: textColor, fontFamily: textFontFamily, fontWeight: textFontWeight }}>{toTitleCase(title)}</p>
      <small className='text-default-500' style={{ fontFamily: textFontFamily }}>
        {formatDate(createdAt)}
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
