import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import { UnitType } from "@@/lib/units/data/UnitModel";
import UnitCreatePages from "@@/lib/units/view/UnitCreatePages";
 
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
        description: 'pages not found'
      }
    }
  
    const responseData = response.data
    return {
      title: capitalizeFirstLetter(action) + " " +responseData.title,
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} unit`
    }
  }
  return {
    title: 'Create unit',
    description: 'Create a new unit'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: UnitType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<UnitType> = await fetchClient(
      "GET",
      `/data/units/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <UnitCreatePages action="create" />;
    case "view":
      return <UnitCreatePages action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
