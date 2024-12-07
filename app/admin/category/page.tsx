import type { Metadata, ResolvingMetadata } from 'next'
import { getPageMetadata } from "../utils";
import { PagesModel } from "@@/lib/pages/data/PagesModel";
import ClientPages from "@@/lib/client/view/ClientPages";
import CategoryPages from '@@/lib/category/view/CategoryPages';
 
type Props = {
  params: Promise<{}>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await getPageMetadata('admin,category') as PagesModel
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
    return <CategoryPages />
}

export default Page