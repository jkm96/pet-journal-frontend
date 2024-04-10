import './globals.css';
import { UIProvider } from '@/context/uiProvider';
import { AuthProvider } from '@/context/authProvider';
import ToastContainerWrapper from '@/components/common/notifications/ToastComponent';
import React from 'react';

// export const metadata: Metadata = {
//   title: 'Online Diary for Pet Lovers | Pet Diaries',
//   description: 'Keep Your Pet Memories Together',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
    <body>
    <UIProvider>
      <AuthProvider>
        <ToastContainerWrapper />
        {children}
      </AuthProvider>
    </UIProvider>
    </body>
    </html>
  );
}
