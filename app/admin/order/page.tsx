import type { Metadata, ResolvingMetadata } from 'next'
import { getPageMetadata } from "../utils";
import { PagesModel } from "@@/lib/pages/data/PagesModel";
import PartnerPages from '@@/lib/partner/view/PartnerPages';
import AdminOrderPages from '@@/lib/renter-orders/view/AdminOrderPages';
 
type Props = {
  params: Promise<{}>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await getPageMetadata('admin,order') as PagesModel
  return {
    title: result.title,
    description: result.meta_description,
    alternates: {
      canonical: result.canonical_url
    },
    keywords: result.keywords,
    openGraph: {
      images: [result.featured_image]
    }
  }
}


const Page = () => {
    return <AdminOrderPages />
}

export default Page