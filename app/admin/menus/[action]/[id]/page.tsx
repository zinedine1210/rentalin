import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";
import { MenusList } from "@@/lib/menus/data/MenusModel";
import MainCreatePage from "@@/lib/menus/view/MainCreatePage";

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
    const response: ApiResponse<MenusList> = await fetchClient(
      "GET",
      `/data/menus/${id}`
    );
  
    if(!response.success){
      return {
        title: 'Not Found',
        description: 'Menus not found'
      }
    }
  
    const responseData = response.data
    return {
      title: capitalizeFirstLetter(action) + " " +responseData.title,
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} menus`
    }
  }
  return {
    title: 'Create menus',
    description: 'Create a new menus'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: MenusList | null = null;

  if (action !== "create") {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<MenusList> = await fetchClient(
      "GET",
      `/data/menus/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <MainCreatePage action="create" />;
    case "update":
      return <MainCreatePage action="update" data={getData} />;
    case "view":
      return <MainCreatePage action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
