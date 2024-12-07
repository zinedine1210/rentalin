import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { CategoryType } from "@@/lib/category/data/CategoryModel";
import CategoryCreatePages from "@@/lib/category/view/CategoryCreatePages";
import { PagesType } from "@@/lib/pages/data/PagesModel";
 
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
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} category`
    }
  }
  return {
    title: 'Create category',
    description: 'Create a new category'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: CategoryType | null = null;

  if (action == 'view') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<CategoryType> = await fetchClient(
      "GET",
      `/data/categories/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }

    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "create":
      return <CategoryCreatePages action="create" />;
    case "view":
      return <CategoryCreatePages action="view" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
