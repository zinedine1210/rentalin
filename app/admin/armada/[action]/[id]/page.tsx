import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import { ArmadaType } from "@@/lib/armada/data/ArmadaModel";
import ArmadaCreatePages from "@@/lib/armada/view/ArmadaCreatePages";
 
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
        description: 'armada not found'
      }
    }
  
    const responseData = response.data
    return {
      title: capitalizeFirstLetter(action) + " " +responseData.title,
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title}`
    }
  }
  return {
    title: 'Create armada',
    description: 'Create a new armada'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: ArmadaType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<ArmadaType> = await fetchClient(
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
      return <ArmadaCreatePages action="create" />;
    case "view":
      return <ArmadaCreatePages action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
