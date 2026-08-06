import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/layouts/sidebar/Sidebar';
import { TopNav } from '@/layouts/topnav/TopNav';
import { Breadcrumb } from '@/layouts/Breadcrumb';
import { Footer } from '@/layouts/Footer';

export function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-canvas">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <Breadcrumb />
        <main className="flex-1 overflow-y-auto px-6 py-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
