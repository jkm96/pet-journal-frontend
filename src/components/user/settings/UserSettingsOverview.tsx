import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { useAuth } from '@/hooks/useAuth';
import ProfileSection from '@/components/user/settings/ProfileSection';
import Breadcrumb from '@/components/shared/breadcrumbs/Breadcrumb';
import BillingSection from '@/components/user/settings/BillingSection';

type TabValue = 'profile' | 'billing' | 'account';

export default function UserSettingsOverview() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<TabValue>(() => {
    const storedTab = localStorage.getItem('selectedTab');
    return (storedTab ?? 'profile') as TabValue;
  });

  const handleTabChange = (key: string | number) => {
    if (typeof key === 'string') {
      setSelectedTab(key as TabValue);
      localStorage.setItem('selectedTab', key as string);
    }
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setSelectedTab(storedTab as TabValue);
    }
  }, []);

  return (
    <>
      <Breadcrumb pageName='Settings' />
      <div className='flex w-full flex-col'>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={handleTabChange}
          aria-label='Options'
          color='primary'
          variant='underlined'
          classNames={{
            tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
            cursor: 'w-full bg-[#22d3ee]',
            tab: 'max-w-fit px-0 h-12',
            tabContent: 'group-data-[selected=true]:text-[#259AE6]',
          }}
        >
          <Tab
            key='profile'
            value='profile'
            title={
              <div className='flex items-center space-x-2'>
                <span>Profile</span>
              </div>
            }
          >
            {selectedTab === 'profile' && (
              <ProfileSection user={user} />
            )}
          </Tab>
          <Tab
            key='billing'
            value='billing'
            title={
              <div className='flex items-center space-x-2'>
                <span>Billing</span>
              </div>
            }
          >
            {selectedTab === 'billing' && (
              <BillingSection user={user} />
            )}
          </Tab>
          <Tab
            key='account'
            value='account'
            title={
              <div className='flex items-center space-x-2'>
                <span>Account</span>
              </div>
            }
          >
            {selectedTab === 'account' && (
              <div>
                <p>Account settings coming soon ...</p>
              </div>
            )}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
