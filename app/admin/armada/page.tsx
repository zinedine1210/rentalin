import type { Metadata, ResolvingMetadata } from 'next'
import { getPageMetadata } from "../utils";
import { PagesModel } from "@@/lib/pages/data/PagesModel";
import ArmadaPages from '@@/lib/armada/view/ArmadaPages';
 
type Props = {
  params: Promise<{}>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = await getPageMetadata('admin,armada') as PagesModel
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
    return <ArmadaPages />
}

export default Page