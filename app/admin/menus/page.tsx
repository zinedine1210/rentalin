import MenusPage from "@@/lib/menus/view/MenusPage"
import type { Metadata, ResolvingMetadata } from 'next'
import { getPageMetadata } from "../utils";
import { MenusModel } from "@@/lib/menus/data/MenusModel";
import { PagesModel } from "@@/lib/pages/data/PagesModel";
 
type Props = {
  params: Promise<{}>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await getPageMetadata('admin,menus') as PagesModel
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
    return <MenusPage />
}

export default Page