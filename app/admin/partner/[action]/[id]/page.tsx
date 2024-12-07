import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import { PartnerType } from "@@/lib/partner/data/PartnerModel";
import PartnerCreatePages from "@@/lib/partner/view/PartnerCreatePages";
 
type Props = {
  params: Promise<{ id: string; action: "create" | "update" | "view" }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id, action } = await params

  if(action != 'create'){
    const response: ApiResponse<PagesType> = await fetchClient(
      "GET",
      `/data/pages/${id}`
    );
  
    if(!response.success){
      return {
        title: 'Not Found',
        description: 'client not found'
      }
    }
  
    const responseData = response.data
    return {
      title: capitalizeFirstLetter(action) + " " +responseData.title,
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} partner`
    }
  }
  return {
    title: 'Create partner',
    description: 'Create a new partner'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: PartnerType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<PartnerType> = await fetchClient(
      "GET",
      `/data/partners/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <PartnerCreatePages action="create" />;
    case "view":
      return <PartnerCreatePages action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
