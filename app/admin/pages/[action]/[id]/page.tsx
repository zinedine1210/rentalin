import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import Create from "@@/lib/pages/view/Create";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
 
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
        description: 'Pages not found'
      }
    }
  
    const responseData = response.data
    return {
      title: capitalizeFirstLetter(action) + " " +responseData.title,
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} pages`
    }
  }
  return {
    title: 'Create pages',
    description: 'Create a new pages'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: PagesType | null = null;

  if (action !== "create") {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<PagesType> = await fetchClient(
      "GET",
      `/data/pages/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <Create action="create" />;
    case "update":
      return <Create action="update" data={getData} />;
    case "view":
      return <Create action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
