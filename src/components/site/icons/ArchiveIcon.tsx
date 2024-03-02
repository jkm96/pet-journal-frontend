import React from 'react';

const ArchiveIcon = ({
                       width = 24,
                       height = 24,
                       color = '#1eebc2',
                       className = 'absolute h-6 w-6 text-fountain-500',
                     }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M21 7H3V3h18zM9.5 11h5c.28 0 .5.22.5.5v.56A4.922 4.922 0 0 1 19 10c.34 0 .68.04
        1 .11V8H4v13h9.03c-.03-.1-.03-.2-.03-.3v-3.5c0-.96.5-1.86 1.2-2.46v-.24c0-.5.12-1.03.3-1.5H9v-1.5c0-.28.22-.5.5-.5M23
         17.3v3.5c0 .6-.6 1.2-1.3 1.2h-5.5c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2v-1.5c0-1.4 1.4-2.5 2.8-2.5s2.8 1.1
          2.8 2.5V16c.6 0 1.2.6 1.2 1.3m-2.5-2.8c0-.8-.7-1.3-1.5-1.3s-1.5.5-1.5 1.3V16h3z' />
    </svg>
  );
};

export default ArchiveIcon;
