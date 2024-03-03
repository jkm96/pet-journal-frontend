import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SettingsIcon from '@/components/shared/icons/SettingsIcon';
import SidebarOpenIcon from '@/components/shared/icons/SidebarOpenIcon';
import DashboardIcon from '@/components/shared/icons/DashboardIcon';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import JournalEntriesIcon from '@/components/shared/icons/JournalEntriesIcon';
import JournalHeartIcon from '@/components/shared/icons/JournalHeartIcon';
import PetProfileIcon from '@/components/shared/icons/PetProfleIcon';
import { useAuth } from '@/hooks/useAuth';
import DiaryStudioIcon from '@/components/shared/icons/DiaryStudioIcon';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen 
            flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center gap-2 px-6 mb-0 py-2 lg:py-4'>
        <Link href={user?.isAdmin ? NAVIGATION_LINKS.ADMIN_DASHBOARD : NAVIGATION_LINKS.USER_DASHBOARD}>
          Pet Diaries
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'>
          <SidebarOpenIcon />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        {/* <!-- Sidebar Menu --> */}
        <nav className=' py-2 px-2 lg:px-4'>
          {/* <!-- Menu Group --> */}

          <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
            MENU
          </h3>

          <ul className='mb-6 flex flex-col gap-4'>
            {user?.isAdmin ? (
              <>
                <li>
                  <Link
                    href={NAVIGATION_LINKS.ADMIN_DASHBOARD}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            text-bodydark2 duration-300 ease-in-out hover:text-white ${
                      pathname === NAVIGATION_LINKS.ADMIN_DASHBOARD && 'text-white'
                    } `}>
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href={NAVIGATION_LINKS.ADMIN_MANAGE_USERS}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            text-bodydark2 duration-300 ease-in-out hover:text-white ${
                      pathname === NAVIGATION_LINKS.ADMIN_MANAGE_USERS && 'text-white'
                    } `}>
                    <DashboardIcon />
                    Users
                  </Link>
                </li>

                <li>
                  <Link
                    href={NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            text-bodydark2 duration-300 ease-in-out hover:text-white ${
                      pathname === NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT && 'text-white'
                    } `}>
                    <DashboardIcon />
                    Site Content
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* <!-- Menu Item Dashboard --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.USER_DASHBOARD}
                    onClick={() => setSidebarOpen(false)}
                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            text-bodydark2 duration-300 ease-in-out hover:text-white ${
                      pathname === NAVIGATION_LINKS.USER_DASHBOARD && 'text-white'
                    } `}>
                    <DashboardIcon />
                    Dashboard
                  </Link>
                </li>
                {/* <!-- Menu Item Dashboard --> */}
                {/* <!-- Menu Item My Pets Mngt --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.PET_PROFILES}
                    onClick={() => setSidebarOpen(false)}
                    className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                        text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname.includes(NAVIGATION_LINKS.PET_PROFILES) &&
                    'text-white'
                    }`}
                  >
                    <PetProfileIcon
                      color={pathname.includes(NAVIGATION_LINKS.PET_PROFILES) ? '#ffffff' : '#8A99AF'} />
                    Pet Profiles
                  </Link>
                </li>
                {/* <!-- Menu Item My Pets Mngt --> */}
                {/* <!-- Menu Item Journal Entries Mngt --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.DIARY_ENTRIES}
                    onClick={() => setSidebarOpen(false)}
                    className={`first-letter:group relative flex 
                                items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out
                                 hover:text-white  ${pathname.includes(NAVIGATION_LINKS.DIARY_ENTRIES) && 'text-white'
                    }`}
                  >
                    <JournalEntriesIcon
                      color={pathname.includes(NAVIGATION_LINKS.DIARY_ENTRIES) ? '#ffffff' : '#8A99AF'} />
                    Diary Entries
                  </Link>
                </li>
                {/* <!-- Menu Item Journal Entries Mngt --> */}

                {/* <!-- Menu Item My Journal Mngt --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.MY_DIARY}
                    onClick={() => setSidebarOpen(false)}
                    className={`first-letter:group relative flex 
                                items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out
                                 hover:text-white  ${pathname.includes(NAVIGATION_LINKS.MY_DIARY) && 'text-white'
                    }`}
                  >
                    <JournalHeartIcon
                      color={pathname.includes(NAVIGATION_LINKS.MY_DIARY) ? '#ffffff' : '#8A99AF'} />
                    My Diary
                  </Link>
                </li>
                {/* <!-- Menu Item My Journal Mngt --> */}

                {/* <!-- Menu Item Diary Studio Mngt --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.MAGIC_STUDIO}
                    onClick={() => setSidebarOpen(false)}
                    className={`first-letter:group relative flex 
                                items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out
                                 hover:text-white  ${pathname.includes(NAVIGATION_LINKS.MAGIC_STUDIO) && 'text-white'
                    }`}
                  >
                    <DiaryStudioIcon
                      color={pathname.includes(NAVIGATION_LINKS.MAGIC_STUDIO) ? '#ffffff' : '#8A99AF'} />
                    Magic Studio
                  </Link>
                </li>
                {/* <!-- Menu Item Diary Studio Mngt --> */}

                {/* <!-- Menu Item Settings --> */}
                <li>
                  <Link
                    href={NAVIGATION_LINKS.SETTINGS}
                    onClick={() => setSidebarOpen(false)}
                    className={`first-letter:group relative flex 
                                items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out
                                 hover:text-white  ${pathname.includes(NAVIGATION_LINKS.SETTINGS) && 'text-white'
                    }`}
                  >
                    <SettingsIcon />
                    Settings
                  </Link>
                </li>
                {/* <!-- Menu Item Settings --> */}
              </>
            )}
          </ul>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
