import { Button } from '@nextui-org/button';
import React from 'react';
import { EditIcon } from '@nextui-org/shared-icons';

export function AddRecordFab(props: { onClick: (e: any) => void }) {
  return <div className='fixed bottom-4 right-4 md:hidden'>
    <Button onClick={props.onClick}
            isIconOnly
            color='success'
            radius='full'
            variant='shadow'>
      <EditIcon color={'#fff'} />
    </Button>
  </div>;
}