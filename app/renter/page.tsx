
import { headers } from "next/headers";

import type { Metadata } from 'next'
import DashboardPage from "@@/lib/renter-dashboard/view/DashboardPage";
 
export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard for the CMS landing'
}
 
const Page = () => {
  const userHeaders = headers().get('X-User-Info');
  return <DashboardPage />
}

export default Page