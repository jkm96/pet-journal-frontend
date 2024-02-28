import { UserResponse } from '@/boundary/interfaces/user';

export function UserDetailsSection({ userDetails }: { userDetails: UserResponse } ) {
  return <div className='overflow-hidden'>
    <div className='px-4 py-5 sm:px-6 justify-items-center text-center'>
      <img
        src={userDetails.profileUrl ?? ''}
        className='rounded-full'
        width={100}
        height={100}
        alt='profile'
      />
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        {userDetails.username}
      </h3>
      <p className='mt-1 text-sm text-center text-gray-500'>
        This is some information about the user.
      </p>
    </div>
    <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
      <div className='py-3 pl-2'>
        <p>Email address : {userDetails.email}</p>
      </div>
    </div>
  </div>;
}
