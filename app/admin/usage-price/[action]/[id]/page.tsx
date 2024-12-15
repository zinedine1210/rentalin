import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import { UsagePriceType } from "@@/lib/usage-price/data/UsagePriceModel";
import UsagePriceCreatePages from "@@/lib/usage-price/view/UsagePriceCreatePages";
 
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
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} usage price`
    }
  }
  return {
    title: 'Create usage price',
    description: 'Create a new usage price'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: UsagePriceType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<UsagePriceType> = await fetchClient(
      "GET",
      `/data/usage-price/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <UsagePriceCreatePages action="create" />;
    case "view":
      return <UsagePriceCreatePages action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
