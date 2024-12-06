import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { ClientType } from "@@/lib/client/data/ClientModel";
import MainClientCreate from "@@/lib/client/view/MainClientCreate";
 
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
    const response: ApiResponse<ClientType> = await fetchClient(
      "GET",
      `/data/client/${id}`
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
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} client`
    }
  }
  return {
    title: 'Create client',
    description: 'Create a new client'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: ClientType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<ClientType> = await fetchClient(
      "GET",
      `/data/client/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <MainClientCreate action="create" />;
    case "view":
      return <MainClientCreate action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
