// app/admin/layout.tsx
import { ReactNode } from 'react';
import AppBar from '../components/AppBar';
import Sidebar from '../components/Sidebar';

export default function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
    <div className='w-full h-screen relative'>
      <main className='flex h-full overflow-hidden'>
        <Sidebar />
        <div className='w-full h-full bg-zinc-100 dark:bg-dark/60 relative flex flex-col'>
          {/* <div id="modal-usr"></div> */}
          <AppBar />
          <div className='flex-1 overflow-y-auto text-sm xl:text-xs 2xl:text-base relative'>
            <div className='z-10 absolute top-1 left-0 bg-primary-500 text-white inline-block rounded-r-full pl-3 pr-5'>
              {/* <Breadcrumb /> */}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
    </>
  );
}
