import { fetchClient, ApiResponse } from "@@/src/hooks/CollectionAPI";

import type { Metadata, ResolvingMetadata } from 'next'
import NotFound from "@@/app/not-found";
import { capitalizeFirstLetter } from "@@/src/utils/script";
import { PagesType } from "@@/lib/pages/data/PagesModel";
import { OrderType } from "@@/lib/renter-orders/data/OrderModel";
import OrderCreatePages from "@@/lib/renter-orders/view/OrderCreatePages";

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
      description: `Page to ${capitalizeFirstLetter(action)} ${responseData.title} order`
    }
  }
  return {
    title: 'Create order',
    description: 'Create a new order'
  }
}

const Page = async ({
  params,
  searchParams
}: Props) => {
  const { id, action } = await params;

  // Fetch data only for "update" or "view"
  let getData: OrderType | null = null;

  if (action == 'update') {
    if (!id) return <NotFound /> // ID required for "update" or "view"
    const response: ApiResponse<OrderType> = await fetchClient(
      "GET",
      `/data/orders/${id}`
    );

    if (!response.success || !response.data) {
      return <NotFound />
    }
    console.log(response.data)
    getData = response.data;
  }

  // Render based on action
  switch (action) {
    case "update":
      return <OrderCreatePages action="update" data={getData} />;
    default:
      return <NotFound />
  }
};

export default Page;
